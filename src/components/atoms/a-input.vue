<template lang="pug">
  .input(
    :class=`{
      'input--error': error,
      'input--focused': focused
    }`
  )
    input.input_field(
      name="input"
      ref="inputField"
      autocomplete="off"
      v-debounce="{ debounce, callback: test.bind(null, '14s') }"
      :type="type"
      :placeholder="placeholder"
      @input="emitEvent('input-value', $event)"
      @blur.stop="emitEvent('input-blur', $event)"
      @focus.stop="emitEvent('input-focus', $event)"
      @keydown.esc.stop="emitEvent('input-escape', $event)"
      @keydown.enter.stop="emitEvent('input-enter', $event)"
      @keydown.up.stop="emitEvent('input-arrow-up', $event)"
      @keydown.down.stop="emitEvent('input-arrow-down', $event)"
    )
    button.input_button(
      v-if="button"
      v-html="btnDict[button]"
      :class="`input_button--${button}`"
      @mousedown.stop="emitEvent('mousedown-button', $event)"
    )
    .input_error(v-show="error") {{ error }}
</template>

<script>
import { debounceDirective } from '@/assets/scripts/directives'

const btnDict = {
  arrow: '▼',
  search: 'Search',
} /* tag-icon */

export default {
  name: 'AInput',
  directives: { debounceDirective },
  props: {
    type: { type: String, default: 'text' },
    placeholder: { type: String, default: '' },
    debounce: { type: Boolean, default: true },
    autocomplete: { type: String, default: 'on' },
    button: {
      type: String,
      default: undefined,
      validator: (prop) => Object.keys(btnDict).includes(prop),
    },
  },
  data: () => ({
    btnDict,
    error: '',
    focused: false,
  }),
  methods: {
    emitEvent(type, event) {
      event.preventDefault()
      if (type === 'input-blur') this.focused = false
      if (type === 'input-focus') this.focused = true
      if (type === 'input-value') {
        this.error = ''
        const invalidCharacter = /[`!@#$%^&*()+=\[\]{};':"\\|<>\/?~]/
        if (invalidCharacter.test(event.target.value)) this.handleError('Invalid character', event)
      }
      return this.$emit(type, event)
    },
    test(param1, event) {
      console.log('here in param1 >>', param1, ' & event >>', event)
    },
    handleError(err, event) {
      this.error = err
      return this.$emit('input-error', event)
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

  &--error
    margin-bottom: 35px

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

  &_error
    left: 0
    color: red
    margin: 8px
    bottom: -100%
    text-align: end
    position: absolute
</style>
