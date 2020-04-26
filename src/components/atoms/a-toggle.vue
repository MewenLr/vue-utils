<template lang="pug">
  .toggle
    label.toggle_label(
      :for="id"
      :class="{ 'toggle_label--end': labelPosition === 'end'}"
    )
      | {{ label }}
    input.toggle_input(
      type="checkbox"
      ref="toggleInput"
      :checked="checked"
      :id="id"
      @change="toggle($event)"
      @blur.stop="focus(false, $event)"
      @focus.stop="focus(true, $event)"
    )
    span.toggle_cta(
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
    id: { type: String, required: true },
    label: { type: String, required: true },
    toggleChecked: { type: Boolean, default: false },
    labelPosition: {
      type: String,
      default: 'start',
      validator: (prop) => ['start', 'end'].includes(prop),
    },
  },
  mounted() {
    if (this.toggleChecked) {
      this.checked = this.toggleChecked
      this.$refs.toggleInput.checked = true
    }
  },
  methods: {
    toggle(event) {
      event.preventDefault()
      this.checked = !this.checked
      this.$emit('toggle-state', this.checked, event)
    },
    focus(bool, event) {
      event.preventDefault()
      this.focused = bool
    },
  },
}
</script>

<style lang="sass">
$padding: 5px

.toggle
  $self: &
  display: flex
  position: relative
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
    top: 0
    left: 0
    margin: 0
    z-index: 1
    opacity: 0
    width: 100%
    height: 100%
    cursor: pointer
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

    &--checked
      background-color: green

      &::after
        transform: translateX(calc(100% + 5px))

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
