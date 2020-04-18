<template lang="pug">
  //- TODO: check accessibility
  .radio(@click="pickRadio")
    label.radio_label(:for="`radio-${value}`") {{ value }}
    input.radio_input(
      type="radio"
      class="radio_input"
      v-show="false"
      :id="`radio-${value}`"
    )
    span.radio_button(
      :class="{'radio_button--picked': checked}"
    )
</template>

<script>
export default {
  name: 'ARadio',
  props: {
    group: { type: String, default: '' },
    value: { type: String, required: true },
    checked: { type: Boolean, default: false },
  },
  methods: {
    pickRadio() {
      return this.$emit('pick-radio', this.value)
    },
  },
}
</script>

<style lang="sass">
.radio
  margin: 5px
  width: 100px
  display: flex
  cursor: pointer
  justify-content: space-between

  &_label
    cursor: pointer

  &_button
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

    &--picked

      &::after
        background-color: coral
</style>
