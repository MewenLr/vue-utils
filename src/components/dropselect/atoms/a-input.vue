<template lang="pug">
  .input(
    :class="{ 'input--focused': focused }"
  )
    input.input_field(
      ref="inputField"
      name="input"
      :type="type"
      :placeholder="placeholder"
      @blur.prevent.stop="emitInputBlur($event)"
      @focus.prevent.stop="emitInputFocus($event)"
      @input="emitInputValue($event.target.value)"
      @keydown.up.prevent.stop="$emit('input-up')"
      @keydown.down.prevent.stop="$emit('input-down')"
      @keydown.esc.prevent.stop="emitInputEscape($event)"
      @keydown.enter.prevent.stop="$emit('input-enter')"
    )
    button.input_button(
      v-if="button"
      v-html="btnDict[button]"
      :class="`input_button--${button}`"
      @mousedown="emitMousedownBtn($event)"
    )
</template>

<script>
const btnDict = {
  arrow: '▼',
  search: 'Search',
}

export default {
  name: 'AInput',
  props: {
    type: { type: String, required: true },
    placeholder: { type: String, default: '' },
    button: { type: String, default: '', validator: (prop) => Object.keys(btnDict).includes(prop) },
  },
  data: () => ({
    btnDict,
    focused: false,
  }),
  methods: {
    emitInputFocus(event) {
      this.focused = true
      this.$emit('input-focus', event)
    },
    emitInputBlur(event) {
      this.focused = false
      this.$emit('input-blur', event)
    },
    emitInputValue(value) {
      this.$emit('input-value', value)
    },
    emitMousedownBtn(event) {
      this.$emit('mousedown-button', event)
    },
    emitInputEscape(event) {
      this.$emit('input-escape', event)
    },
  },
}
</script>

<style lang="sass">
.input
  $self: &
  margin: 0
  width: 250px
  display: flex
  position: relative
  border-radius: 5px
  background-color: #fff
  border: 1px solid #e8e8e8
  transition: border linear .1s

  &--focused

    #{$self}_button

      &--arrow
        transform: rotate(180deg)

  &_field
    padding: 0
    border: none
    height: 35px
    margin: 0 8px
    outline: none
    width: inherit
    font-size: 14px
    background-color: transparent
    font-family: Roboto, sans-serif

  &_button
    color: #777
    height: 35px
    border: none
    outline: none
    cursor: pointer
    min-width: 35px
    background-color: transparent
    transition: transform linear .1s
</style>
