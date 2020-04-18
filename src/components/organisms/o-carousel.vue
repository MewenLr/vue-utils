<template lang="pug">
  .carousel(
    ref="carousel"
    v-drag-up="stopDrag"
    @mousedown.prevent.stop="startDrag($event)"
    @mousemove.prevent.stop="doDrag($event)"
  )
    .carousel_slides(ref="carouselSlides")
      slot
    .carousel_nav
      button.carousel_nav_previous(@mousedown.prevent.stop="animationOff ? goPrevious($event) : null") <
      button.carousel_nav_next(@mousedown.prevent.stop="animationOff ? goNext($event) : null") >
    .carousel_pagination
      button.carousel_pagination_btn(
        v-for="n in slides.length"
        :class="{'carousel_pagination_btn--active': (n - 1) === target}"
        @mousedown.prevent.stop="goTo(n - 1)"
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
    direction: 'right',
    animationOff: true,
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
    next() {
      if ((this.target + 1) === this.slides.length) return 0
      return this.target + 1
    },
    previous() {
      if ((this.target - 1) < 0) return this.slides.length - 1
      return this.target - 1
    },
    lastIndex() {
      return this.slides.length - 1
    },
  },
  watch: {
    slides() {
      if (this.target >= (this.slides.length - 1)) this.target = this.slides.length - 1
    },
    target(newVal, oldVal) {
      this.slides.forEach((slide) => {
        if (slide.index !== this.target || slide.index !== this.previous || slide.index !== this.next) {
          this.slides[slide.index].$el.style.transform = `translateX(${(slide.index - this.target) * 100}%)`
        }
      })
      this.slides[this.target].$el.style.transform = 'translateX(0)'
      this.slides[this.previous].$el.style.transform = 'translateX(-100%)'
      this.slides[this.next].$el.style.transform = 'translateX(100%)'

      if (
        (newVal === this.lastIndex || oldVal === this.lastIndex)
        && (newVal === 0 || oldVal === 0)
      ) {
        // && this.index === 0
        this.slides[0].$el.style.zIndex = this.slides.length
        // this.$el.style.zIndex = this.slides.length
        setTimeout(() => this.slides[0].$el.style.zIndex = '', this.animationDelay)
      } else if (
        (oldVal !== this.lastIndex && newVal !== this.lastIndex)
      ) {
        // && this.index === this.lastIndex
        this.slides[this.lastIndex].$el.style.zIndex = -1
        // this.$el.style.zIndex = -1
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
      this.animationOff = false
      this.direction = 'previous'
      if (this.target <= 0) this.target = this.slides.length - 1
      else this.target -= 1
      await setTimeout(() => this.animationOff = true, this.animationDelay)
    },
    async goNext(event) {
      event.preventDefault()
      this.animationOff = false
      this.direction = 'next'
      if (this.target >= (this.slides.length - 1)) this.target = 0
      else this.target += 1
      await setTimeout(() => this.animationOff = true, this.animationDelay)
    },
    goTo(index) {
      this.direction = index > this.target ? 'next' : 'previous'
      this.target = index
    },
    startDrag(event) {
      if (this.animationOff) {
        this.dragging = true
        this.startPoint = event.clientX
      }
    },
    doDrag(event) {
      if (this.dragging) {
        const gap = event.clientX - this.startPoint
        this.gapPercent = (gap / this.$refs.carousel.offsetWidth) * 100
        if (gap > 0) {
          this.slides[this.previous].$el.style.transition = ''
          this.slides[this.target].$el.style.transition = ''

          this.slides[this.previous].$el.style.transform = `translateX(${-100 + this.gapPercent}%)`
          this.slides[this.target].$el.style.transform = `translateX(${0 + this.gapPercent}%)`
        } else if (gap < 0) {
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
        if (this.gapPercent === 0) this.goNext(event)
        else if (this.gapPercent > 0) {
          this.slides[this.previous].$el.style.transition = `transform ease-in-out ${this.animationDelay / 1000}s`
          this.slides[this.target].$el.style.transition = `transform ease-in-out ${this.animationDelay / 1000}s`
          if (this.gapPercent > 10) {
            this.goPrevious(event)
          }
          else {
            this.slides[this.previous].$el.style.transform = `translateX(${-100}%)`
            this.slides[this.target].$el.style.transform = `translateX(${0}%)`
          }
        }
        else if (this.gapPercent < 0) {
          this.slides[this.next].$el.style.transition = `transform ease-in-out ${this.animationDelay / 1000}s`
          this.slides[this.target].$el.style.transition = `transform ease-in-out ${this.animationDelay / 1000}s`
          if ((this.gapPercent * -1) > 10) {
            this.goNext(event)
          }
          else {
            this.slides[this.next].$el.style.transform = `translateX(${100}%)`
            this.slides[this.target].$el.style.transform = `translateX(${0}%)`
          }
        }
        this.gapPercent = 0
      }
    },
  },
}
</script>

<style lang="sass">
.carousel
  width: inherit
  height: inherit
  // overflow: hidden
  user-select: none
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
      outline: none
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
      outline: none
      cursor: pointer
      border-radius: 100%
      border: 1px solid white
      background-color: transparent

      &--active
        background-color: white
</style>
