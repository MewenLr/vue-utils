<template lang="pug">
  .slide(
    ref="slide"
  )
    slot
  //- .slide(
  //-   :class=`{
  //-     'slide--next': nextSlide === index,
  //-     'slide--target': $parent.target === index,
  //-     'slide--previous': previousSlide === index,
  //-     'slide--next-in': inNextSlide,
  //-     'slide--next-out': outNextSlide,
  //-     'slide--previous-in': inPreviousSlide,
  //-     'slide--previous-out': outPreviousSlide
  //-   }`
  //- )
  //-   slot
  //- transition(:name="transition")
  //-   .slide(v-show="visible")
  //-     slot
</template>

<script>
export default {
  name: 'MSlide',
  props: {
    index: { type: Number, default: 0 },
    direction: { type: String, default: '' },
  },
  computed: {
    parentTarget() {
      return this.$parent.target
    },
    // visible() {
    //   return this.index === this.$parent.target
    // },
    // transition() {
    //   if (this.$parent.direction) return `slide-${this.$parent.direction}`
    //   return undefined
    // },
    // nextSlide() {
    //   if ((this.$parent.target + 1) === this.$parent.slides.length) return 0
    //   return this.$parent.target + 1
    // },
    // previousSlide() {
    //   if ((this.$parent.target - 1) < 0) return this.$parent.slides.length - 1
    //   return this.$parent.target - 1
    // },
    // inNextSlide() {
    //   if (this.$parent.direction === 'next' && this.$parent.target === this.index) return true
    //   return false
    // },
    // inPreviousSlide() {
    //   if (this.$parent.direction === 'previous' && this.$parent.target === this.index) return true
    //   return false
    // },
    // outNextSlide() {
    //   const nextIndex = (this.$parent.target - 1) < 0 ? this.$parent.slides.length - 1 : this.$parent.target - 1
    //   if (this.$parent.direction === 'next' && nextIndex === this.index) return true
    //   return false
    // },
    // outPreviousSlide() {
    //   const previous = (this.$parent.target + 1) === this.$parent.slides.length ? 0 : this.$parent.target + 1
    //   if (this.$parent.direction === 'previous' && previous === this.index) return true
    //   return false
    // },
  },
  watch: {
    // parentTarget(newVal, oldVal) {
    //   const lastIndex = this.$parent.slides.length - 1
    //   // set target slide style
    //   if (this.index === this.$parent.target) {
    //     this.$el.style.transform = 'translateX(0)'
    //   }
    //   // set previous slide style
    //   else if (this.index === this.$parent.previous) {
    //     this.$el.style.transform = 'translateX(-100%)'
    //   }
    //   // set next slide style
    //   else if (this.index === this.$parent.next) {
    //     this.$el.style.transform = 'translateX(100%)'
    //   }
    //   else {
    //     this.$el.style.transform = `translateX(${(this.index - this.$parent.target) * 100}%)`
    //   }

    //   if (
    //     (newVal === lastIndex || oldVal === lastIndex)
    //     && (newVal === 0 || oldVal === 0)
    //     && this.index === 0
    //   ) {
    //     this.$el.style.zIndex = this.$parent.slides.length
    //     setTimeout(() => this.$el.style.zIndex = '', this.$parent.animationDelay)
    //   }
    //   else if (
    //     (oldVal !== lastIndex && newVal !== lastIndex)
    //     && this.index === lastIndex
    //   ) {
    //     console.log('in here')
    //     this.$el.style.zIndex = -1
    //     setTimeout(() => this.$el.style.zIndex = '', this.$parent.animationDelay)
    //   }
    // },
  },
}
</script>

<style lang="sass">
$delay: 1s

/* previous */
@keyframes slidePreviousIn
  from
    transform: translateX(-100%)
  to
    transform: translateX(0)

@keyframes slidePreviousOut
  from
    transform: translateX(0)
  to
    transform: translateX(100%)

.slide-left-enter-active
  animation: slideLeftIn $delay ease-in-out

.slide-left-leave-active
  // top: 0
  // left: 0
  // position: absolute
  animation: slideLeftOut $delay ease-in-out

/* next */
@keyframes slideNextIn
  from
    transform: translateX(100%)
  to
    transform: translateX(0)

@keyframes slideNextOut
  from
    transform: translateX(0)
  to
    transform: translateX(-100%)

.slide-right-enter-active
  animation: slideNextIn $delay ease-in-out

.slide-right-leave-active
  top: 0
  left: 0
  position: absolute
  animation: slideNextOut $delay ease-in-out

.slide
  width: inherit
  height: inherit
  user-select: none
  position: absolute
  // transition: transform ease-in-out 1s

  // &--next, &--target, &--previous
  //   z-index: 1

  // &--next
  //   transform: translateX(100%)

  // &--target
  //   transform: translateX(0)

  // &--previous
  //   transform: translateX(-100%)

  // &--in
  //   animation: slideRightIn $delay ease-in-out
  // &--out
  //   animation: slideRightOut $delay ease-in-out

  // &--previous-in
  //   animation: slidePreviousIn $delay ease-in-out
  // &--previous-out
  //   animation: slidePreviousOut $delay ease-in-out

  // &--next-in
  //   animation: slideNextIn $delay ease-in-out
  // &--next-out
  //   animation: slideNextOut $delay ease-in-out
</style>
