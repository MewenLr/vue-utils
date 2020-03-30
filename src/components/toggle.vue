<template lang="pug">
  .toggle(
    :class="{ 'toggle--right': isActive }"
    @click="activateToggle"
  )
    button.toggle_button(
      :class="{ 'toggle_button--active': isActive }"
    )
</template>

<script>
export default {
  name: 'Toggle',
  data: () => ({
    isActive: false,
  }),
  props: {
    checked: { type: Boolean, default: false },
  },
  mounted() {
    if (this.checked) this.isActive = this.checked
  },
  methods: {
    activateToggle() {
      this.isActive = !this.isActive
      this.$emit('toggle-state', this.isActive)
    },
  },
}
</script>

<style lang="sass">
.toggle
  $self: &
  width: 100px
  height: 50px
  padding: 5px
  display: flex
  cursor: pointer
  align-items: center
  border-radius: 50px
  background-color: coral
  transition: all .2s linear

  &--right
    background-color: lightgreen

    #{ $self }_button
      transform: translateX(100%)

  &:active

    #{ $self }_button
      background-color: #eee

  &_button
    width: 50px
    height: 50px
    border: none
    outline: none
    cursor: inherit
    border-radius: 100%
    background-color: white
    transform: translateX(0)
    transition: all .3s linear
    box-shadow: 0px 0px 3px 2px rgba(0, 0, 0, 0.2)
</style>
