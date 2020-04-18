<template lang="pug">
  .carousel(
    ref="carousel"
    v-drag-up="stopDrag"
    @mousemove.stop="doDrag($event)"
    @mousedown.stop="startDrag($event)"
  )
    .carousel_slides(ref="carouselSlides")
      slot
    .carousel_nav
      button.carousel_nav_previous(
        aria-label="Previous Slide"
        @mousedown.stop="!animationOn ? goPrevious($event) : null"
        @keydown.enter.stop="!animationOn ? goPrevious($event) : null"
      ) <
      button.carousel_nav_next(
        aria-label="Next Slide"
        @mousedown.stop="!animationOn ? goNext($event) : null"
        @keydown.enter.stop="!animationOn ? goNext($event) : null"
      ) >
    .carousel_pagination
      button.carousel_pagination_btn(
        v-for="n in slides.length"
        :aria-label="`Slide ${n}`"
        :class="{'carousel_pagination_btn--active': (n - 1) === target}"
        @mousedown.stop="goTo(n - 1, $event)"
        @keydown.enter.stop="goTo(n - 1, $event)"
      )
</template>

<script>
export default {
  name: 'OCarousel',
  data: () => ({
    slides: [],
    gapPercent: 0,
    dragging: false,
    target: undefined,
    animationOn: false,
    animationDelay: 300,
    startPoint: undefined,
  }),
  directives: {
    'drag-up': {
      bind: (el, binding) => {
        el.eventFn = (event) => binding.value(event)
        window.addEventListener('mouseup', el.eventFn)
      },
      unbind: (el) => {
        window.removeEventListener('mouseup', el.eventFn)
      },
    },
  },
  computed: {
    lastIndex() {
      return this.slides.length - 1
    },
    previous() {
      if ((this.target - 1) < 0) return this.lastIndex
      return this.target - 1
    },
    next() {
      if ((this.target + 1) === this.slides.length) return 0
      return this.target + 1
    },
  },
  watch: {
    slides() {
      if (this.target >= (this.lastIndex)) this.target = this.lastIndex
    },
    target(newVal, oldVal) {
      this.slides.forEach((slide, index) => {
        if (index !== this.target || index !== this.previous || index !== this.next) {
          this.slides[index].$el.style.transform = `translateX(${(index - this.target) * 100}%)`
        }
      })
      this.slides[this.target].$el.style.transform = 'translateX(0)'
      this.slides[this.next].$el.style.transform = 'translateX(100%)'
      this.slides[this.previous].$el.style.transform = 'translateX(-100%)'

      if ((newVal === this.lastIndex || newVal === 0) && (oldVal === this.lastIndex || oldVal === 0)) {
        /* handle error from first to last index and last from first index */
        this.slides[0].$el.style.zIndex = this.slides.length
        setTimeout(() => this.slides[0].$el.style.zIndex = '', this.animationDelay)
      } else if (oldVal !== this.lastIndex && newVal !== this.lastIndex) {
        /* handle error from last to any inferior index */
        this.slides[this.lastIndex].$el.style.zIndex = -1
        setTimeout(() => this.slides[this.lastIndex].$el.style.zIndex = '', this.animationDelay)
      }
    },
  },
  mounted() {
    this.target = 0
    this.slides = this.$children
    this.slides.forEach((slide) => slide.$el.style.transition = `transform ease-in-out ${this.animationDelay / 1000}s`)
  },
  methods: {
    async goPrevious(event) {
      event.preventDefault()
      this.animationOn = true
      if (this.target <= 0) this.target = this.lastIndex
      else this.target -= 1
      await setTimeout(() => this.animationOn = false, this.animationDelay)
    },
    async goNext(event) {
      event.preventDefault()
      this.animationOn = true
      if (this.target >= (this.lastIndex)) this.target = 0
      else this.target += 1
      await setTimeout(() => this.animationOn = false, this.animationDelay)
    },
    goTo(index, event) {
      event.preventDefault()
      this.target = index
    },
    startDrag(event) {
      event.preventDefault()
      if (!this.animationOn) {
        this.dragging = true
        this.startPoint = event.clientX
      }
    },
    doDrag(event) {
      event.preventDefault()
      if (this.dragging) {
        this.gapPercent = ((event.clientX - this.startPoint) / this.$refs.carousel.offsetWidth) * 100
        if (this.gapPercent > 0) {
          this.slides[this.target].$el.style.transition = ''
          this.slides[this.previous].$el.style.transition = ''

          this.slides[this.target].$el.style.transform = `translateX(${0 + this.gapPercent}%)`
          this.slides[this.previous].$el.style.transform = `translateX(${-100 + this.gapPercent}%)`
        } else if (this.gapPercent < 0) {
          this.slides[this.next].$el.style.transition = ''
          this.slides[this.target].$el.style.transition = ''

          this.slides[this.next].$el.style.transform = `translateX(${100 - (this.gapPercent * -1)}%)`
          this.slides[this.target].$el.style.transform = `translateX(${0 - (this.gapPercent * -1)}%)`
        }
      }
    },
    stopDrag(event) {
      event.preventDefault()
      if (this.dragging) {
        this.dragging = false
        const transitionStyle = `transform ease-in-out ${this.animationDelay / 1000}s`
        if (this.gapPercent === 0) this.goNext(event)
        else if (this.gapPercent > 0) {
          this.slides[this.previous].$el.style.transition = transitionStyle
          this.slides[this.target].$el.style.transition = transitionStyle
          if (this.gapPercent > 10) this.goPrevious(event)
          else {
            this.slides[this.previous].$el.style.transform = `translateX(${-100}%)`
            this.slides[this.target].$el.style.transform = `translateX(${0}%)`
          }
        } else if (this.gapPercent < 0) {
          this.slides[this.next].$el.style.transition = transitionStyle
          this.slides[this.target].$el.style.transition = transitionStyle
          if ((this.gapPercent * -1) > 10) this.goNext(event)
          else {
            this.slides[this.next].$el.style.transform = `translateX(${100}%)`
            this.slides[this.target].$el.style.transform = `translateX(${0}%)`
          }
        }
        this.gapPercent = 0
        this.startPoint = undefined
      }
    },
  },
}
</script>

<style lang="sass">
.carousel
  width: inherit
  height: inherit
  overflow: hidden
  position: relative

  &_slides
    display: flex
    width: inherit
    height: inherit

  &_nav
    top: 50%
    z-index: 101
    width: 100%
    display: flex
    position: absolute
    transform: translateY(-50%)
    justify-content: space-between

    &_previous, &_next
      padding: 0
      width: 50px
      height: 50px
      border: none
      color: white
      cursor: pointer
      font-size: 20px
      background-color: rgba(black, 0.8)

  &_pagination
    z-index: 100
    width: 100%
    bottom: 5px
    display: flex
    position: absolute
    justify-content: center

    &_btn
      padding: 0
      width: 15px
      height: 15px
      margin: 0 5px
      cursor: pointer
      border-radius: 100%
      border: 1px solid white
      background-color: transparent

      &--active
        background-color: white
</style>
