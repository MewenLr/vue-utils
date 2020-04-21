<template lang="pug">
  //- TODO: fix style
  .radio
    label.radio_label(
      v-if="label"
      :for="`radio-${value}`"
      :class="{ 'radio_label--end': labelPosition === 'end'}"
    )
      | {{ label }}
    input.radio_input(
      type="radio"
      ref="radioInput"
      class="radio_input"
      :name="group"
      :id="`radio-${value}`"
      @change="pick($event)"
      @blur.stop="focus(false, $event)"
      @focus.stop="focus(true, $event)"
    )
    span.radio_cta(
      :class=`{
        'radio_cta--checked': checked,
        'radio_cta--focused': focused,
      }`
    )
</template>

<script>
export default {
  name: 'ARadio',
  data: () => ({
    focused: false,
    checked: false,
  }),
  props: {
    label: { type: String, required: true },
    group: { type: String, required: true },
    value: { type: String, required: true },
    initialState: { type: Boolean, default: false },
    labelPosition: {
      type: String,
      default: 'beginning',
      validator: (prop) => ['beginning', 'end'].includes(prop),
    },
  },
  mounted() {
    if (this.initialState) {
      this.checked = this.initialState
      this.$refs.radioInput.checked = true
    }
  },
  methods: {
    pick(event) {
      event.preventDefault()
      this.checked = !this.checked
      return this.$emit('pick-radio', this.value, event)
    },
    focus(bool, event) {
      event.preventDefault()
      this.focused = bool
    },
  },
}
</script>

<style lang="sass">
.radio
  margin: 5px
  display: flex
  position: relative
  justify-content: space-between

  &_label
    cursor: pointer
    user-select: none
    margin: 0 10px 0 0

    &--end
      order: 2
      margin: 0 0 0 10px

  &_input
    margin: 0
    z-index: 1
    width: 100%
    height: 100%
    position: absolute

  &_cta
    width: 20px
    height: 20px
    outline: none
    position: relative
    border-style: inset
    border-radius: 100%
    border: 2px solid coral

    &::after
      top: 50%
      left: 50%
      width: 65%
      height: 65%
      content: ''
      position: absolute
      border-radius: 100%
      transition: all .2s linear
      background-color: transparent
      transform: translate(-50%, -50%)

    &--checked

      &::after
        background-color: coral

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
</style>
