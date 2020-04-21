<template lang="pug">
  //- TODO: remove prevent && add preventDefault
  .input(
    :class="{ 'input--focused': focused }"
  )
    input.input_field(
      ref="inputField"
      name="input"
      v-debounce:200="test.bind(null, '14s')"
      :type="type"
      :placeholder="placeholder"
      @keyup="emitEvent('input-keyup')"
      @input="emitEvent('input-value', $event)"
      @blur.prevent.stop="emitEvent('input-blur', $event)"
      @focus.prevent.stop="emitEvent('input-focus', $event)"
      @keydown.esc.prevent.stop="emitEvent('input-escape', $event)"
      @keydown.enter.prevent.stop="emitEvent('input-enter', $event)"
      @keydown.up.prevent.stop="emitEvent('input-arrow-up', $event)"
      @keydown.down.prevent.stop="emitEvent('input-arrow-down', $event)"
    )
    button.input_button(
      v-if="button"
      v-html="btnDict[button]"
      :class="`input_button--${button}`"
      @mousedown.prevent.stop="emitEvent('mousedown-button', $event)"
    )
</template>

<script>
import { debounce } from '@/assets/scripts/directives'

const btnDict = {
  arrow: '▼',
  search: 'Search',
} /* tag-icon */

export default {
  name: 'AInput',
  directives: { debounce },
  props: {
    type: { type: String, default: 'text' },
    placeholder: { type: String, default: '' },
    button: {
      type: String,
      default: undefined,
      validator: (prop) => Object.keys(btnDict).includes(prop),
    },
  },
  data: () => ({
    btnDict,
    focused: false,
  }),
  methods: {
    emitEvent(type, event) {
      event.preventDefault()
      if (type === 'input-blur') this.focused = false
      if (type === 'input-focus') this.focused = true
      if (type === 'input-value') {
        const invalidCharacter = /[`!@#$%^&*()+=\[\]{};':"\\|<>\/?~]/
        if (invalidCharacter.test(event.target.value)) return this.$emit('input-error', 'Invalid character')
      }
      return this.$emit(type, event)
    },
    test(param1, event) {
      console.log('here in event >>', event, ' & param1 >>', param1)
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
