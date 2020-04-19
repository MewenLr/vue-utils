<template lang="pug">
  //- TODO: fix double call blur / focus
  .toggle
    label.toggle_label(
      @click="toggle($event)"
      v-if="label"
      :class="{ 'toggle_label--end': labelPosition === 'end'}"
    )
      | {{ label }}
    input.toggle_input(
      id="label"
      type="checkbox"
      ref="toggleInput"
      @blur.stop="focus(false, $event)"
      @focus.stop="focus(true, $event)"
      @change="toggle($event)"
    )
    span.toggle_cta(
      ref="toggleCta"
      @click="toggle($event)"
      :class=`{
        'toggle_cta--checked': checked,
        'toggle_cta--focused': focused,
      }`
    )
</template>

<script>
export default {
  name: 'AToggle',
  data: () => ({
    focused: false,
    checked: false,
  }),
  props: {
    label: { type: String, default: '' },
    initialState: { type: Boolean, default: false },
    labelPosition: { type: String, default: 'beginning' },
  },
  mounted() {
    if (this.checked) {
      this.checked = this.initialState
      this.$refs.toggleInput.checked = true
    }
  },
  methods: {
    toggle(event) {
      event.preventDefault()
      this.checked = !this.checked
      if (!this.focused) this.$refs.toggleInput.focus()
      if (event.type === 'click' && this.checked) {
        this.$refs.toggleInput.checked = true
      } else if (event.type === 'click') {
        this.$refs.toggleInput.checked = false
      }
      this.$emit('toggle-state', this.checked, event)
    },
    focus(bool, event) {
      event.preventDefault()
      console.log('here in event >', event)
      this.focused = bool
      console.log('here in focused >', this.focused)
      console.log('-----------------')
    },
  },
}
</script>

<style lang="sass">
$padding: 5px

.toggle
  $self: &
  display: flex
  align-items: center
  transition: all .2s linear

  &_label
    cursor: pointer
    user-select: none
    margin: 0 10px 0 0

    &--end
      order: 2
      margin: 0 0 0 10px

  &_input
    // opacity: 0
    top: 50px
    position: absolute

  &_cta
    width: 45px
    height: 20px
    padding: 5px
    cursor: pointer
    position: relative
    border-radius: 100px
    background-color: coral

    &::after
      content: ''
      width: 20px
      height: 20px
      display: block
      position: relative
      border-radius: 100%
      background-color: white
      transform: translateX(0)
      transition: all .2s linear
      box-shadow: 0px 0px 3px 2px rgba(0, 0, 0, 0.2)

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

    &--checked
      background-color: green

      &::after
        transform: translateX(calc(100% + 5px))
</style>
