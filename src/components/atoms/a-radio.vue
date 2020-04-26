<template lang="pug">
  .radio(
    :class="{ 'radio--end': labelPosition === 'end'}"
  )
    label.radio_label(:for="id") {{ label }}
    input.radio_input(
      type="radio"
      ref="radioInput"
      class="radio_input"
      :id="id"
      :name="group"
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
  }),
  props: {
    id: { type: String, required: true },
    label: { type: String, required: true },
    group: { type: String, required: true },
    value: { type: String, required: true },
    radioChecked: { type: Boolean, default: false },
    labelPosition: {
      type: String,
      default: 'start',
      validator: (prop) => ['start', 'end'].includes(prop),
    },
  },
  computed: {
    checked() {
      return this.radioChecked
    },
  },
  mounted() {
    if (this.radioChecked) this.$refs.radioInput.checked = true
  },
  methods: {
    pick(event) {
      event.preventDefault()
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
  $self: &
  margin: 5px
  display: flex
  position: relative
  justify-content: space-between

  &_label
    user-select: none
    margin: 0 10px 0 0

  &_input
    margin: 0
    z-index: 1
    opacity: 0
    width: 100%
    height: 100%
    cursor: pointer
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

  &--end
    justify-content: flex-start

    #{ $self }_label
      order: 2
      margin: 0 0 0 10px
</style>
