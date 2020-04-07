<template lang="pug">
  .input(
    :class="{ 'input--focused': focused }"
  )
    input.input_field(
      ref="inputField"
      name="input"
      :type="type"
      :placeholder="placeholder"
      @input="emitEvent('input-value', $event)"
      @blur.prevent.stop="emitEvent('input-blur', $event)"
      @focus.prevent.stop="emitEvent('input-focus', $event)"
      @keydown.up.prevent.stop="emitEvent('input-up', $event)"
      @keydown.down.prevent.stop="emitEvent('input-down', $event)"
      @keydown.esc.prevent.stop="emitEvent('input-escape', $event)"
      @keydown.enter.prevent.stop="emitEvent('input-enter', $event)"
    )
    button.input_button(
      v-if="button"
      v-html="btnDict[button]"
      :class="`input_button--${button}`"
      @mousedown="emitEvent('mousedown-button', $event)"
    )
</template>

<script>
const btnDict = {
  arrow: '▼',
  search: 'Search',
} /* tag-icon */

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
    emitEvent(type, event) {
      if (type === 'input-blur') this.focused = false
      if (type === 'input-focus') this.focused = true
      this.$emit(type, event)
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
