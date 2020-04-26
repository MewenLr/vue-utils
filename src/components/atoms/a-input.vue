<template lang="pug">
  .input
    label.input_label(:for="id") {{ label }}
    .input_bar(:class="{ 'input_bar--focused': focused }")
      input.input_bar_field(
        name="input"
        ref="inputField"
        v-debounce="{ debounce, callback: emitEvent.bind(null, 'input-debounce') }"
        :id="id"
        :type="type"
        :placeholder="placeholder"
        :autocomplete="autocomplete ? 'on' : 'off'"
        @input="emitEvent('input-value', $event)"
        @keyup="emitEvent('input-keyup', $event)"
        @blur.stop="emitEvent('input-blur', $event)"
        @focus.stop="emitEvent('input-focus', $event)"
        @keydown.esc.stop="emitEvent('input-escape', $event)"
        @keydown.enter.stop="emitEvent('input-enter', $event)"
        @keydown.up.stop="emitEvent('input-arrow-up', $event)"
        @keydown.down.stop="emitEvent('input-arrow-down', $event)"
      )
      button.input_bar_cta(
        v-if="button"
        v-html="btnDict[button]"
        :aria-label="button"
        :class="`input_bar_cta--${this.button}`"
        @mousedown.stop="emitEvent('tigger-cta', $event)"
        @keydown.enter.stop="emitEvent('tigger-cta', $event)"
      )
    .input_error(v-show="error") {{ error }}
</template>

<script>
import { debounceDirective } from '@/assets/scripts/directives'

const btnDict = {
  open: '▼',
  search: 'Search',
} /* tag-icon */

export default {
  name: 'AInput',
  directives: { debounceDirective },
  props: {
    id: { type: String, required: true },
    type: { type: String, default: 'text' },
    label: { type: String, required: true },
    placeholder: { type: String, default: '' },
    debounce: { type: Boolean, default: false },
    autocomplete: { type: Boolean, default: true },
    clearInputError: { type: Boolean, default: false },
    button: {
      type: String,
      default: undefined,
      validator: (prop) => Object.keys(btnDict).includes(prop),
    },
  },
  watch: {
    clearInputError(newVal) {
      if (newVal) this.error = ''
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
        else this.$emit('input-error', false, event)
      }
      return this.$emit(type, event)
    },
    handleError(err, event) {
      this.error = err
      return this.$emit('input-error', err, event)
    },
  },
}
</script>

<style lang="sass">
.input
  $self: &

  &_label
    display: block
    cursor: pointer
    margin: 5px 8px

  &_bar
    width: 250px
    display: flex
    position: relative
    border-radius: 5px
    background-color: #fff
    border: 1px solid #e8e8e8
    transition: border linear .1s

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

    &_cta
      color: #777
      height: 35px
      border: none
      cursor: pointer
      min-width: 35px
      background-color: transparent
      transition: transform linear .2s

    &--focused

      &::before
        top: -1.4px
        left: -1.4px
        content: ''
        width: 100%
        height: 100%
        position: absolute
        border-radius: 2px
        border: 1.5px solid #4D90FE

      #{$self}_bar_cta

        &--open
          transform: rotate(180deg)

  &_error
    left: 0
    color: red
    bottom: -100%
    text-align: end
    margin: 5px 8px
</style>
