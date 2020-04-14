<template lang="pug">
  transition(:name="transition")
    .slide(v-show="visible")
      slot
</template>

<script>
export default {
  name: 'MSlide',
  props: {
    index: { type: Number, default: 0 },
    direction: { type: String, default: '' },
  },
  computed: {
    visible() {
      return this.index === this.$parent.target
    },
    transition() {
      if (this.$parent.direction) return `slide-${this.$parent.direction}`
      return undefined
    },
  },
}
</script>

<style lang="sass">
$delay: .5s

/* left */
@keyframes slideLeftIn
  from
    transform: translateX(-100%)
  to
    transform: translateX(0)

@keyframes slideLeftOut
  from
    transform: translateX(0)
  to
    transform: translateX(100%)

.slide-left-enter-active
  animation: slideLeftIn $delay ease-in-out

.slide-left-leave-active
  top: 0
  left: 0
  position: absolute
  animation: slideLeftOut $delay ease-in-out

/* right */
@keyframes slideRightIn
  from
    transform: translateX(100%)
  to
    transform: translateX(0)

@keyframes slideRightOut
  from
    transform: translateX(0)
  to
    transform: translateX(-100%)

.slide-right-enter-active
  animation: slideRightIn $delay ease-in-out

.slide-right-leave-active
  top: 0
  left: 0
  position: absolute
  animation: slideRightOut $delay ease-in-out

.slide
  width: inherit
  height: inherit
  // display: block !important
</style>
