<template lang="pug">
  .carousel(
    ref="carousel"
    @mousedown="startDrag($event)"
    @mousemove="doDrag($event)"
    @mouseup="stopDrag($event)"
  )
    .carousel_slides
      slot
    .carousel_nav
      button.carousel_nav_previous(@click.prevent.stop="btnEnabled ? previous() : null") <
      button.carousel_nav_next(@click.prevent.stop="btnEnabled ? next() : null") >
    .carousel_pagination
      button.carousel_pagination_btn(
        v-for="n in nbSlides"
        :class="{'carousel_pagination_btn--active': (n - 1) === target}"
        @click.prevent.stop="goTo(n - 1)"
      )
</template>

<script>
export default {
  name: 'OCarousel',
  data: () => ({
    target: 0,
    slides: [],
    dragging: false,
    btnEnabled: true,
    direction: 'right',
    startPoint: undefined,
  }),
  computed: {
    nbSlides() {
      return this.slides.length
    },
  },
  watch: {
    slides() {
      if (this.target >= (this.nbSlides - 1)) this.target = this.nbSlides - 1
    },
  },
  mounted() {
    this.slides = this.$children
  },
  methods: {
    async previous() {
      this.btnEnabled = false
      this.direction = 'left'
      if (this.target <= 0) this.target = this.nbSlides - 1
      else this.target -= 1
      await setTimeout(() => this.btnEnabled = true, 500)
    },
    async next() {
      this.btnEnabled = false
      this.direction = 'right'
      if (this.target >= (this.nbSlides - 1)) this.target = 0
      else this.target += 1
      await setTimeout(() => this.btnEnabled = true, 500)
    },
    goTo(index) {
      this.direction = index > this.target ? 'right' : 'left'
      this.target = index
    },

    startDrag(event) {
      this.dragging = true
      this.startPoint = event.clientX
      console.log('here is startPoint >', this.startPoint)
    },
    doDrag(event) {
      if (this.dragging) {
        const gap = this.startPoint - event.clientX
        const el = document.querySelector('.container_child')
        if (gap >= 0) {
          el.classList.add('container_child--slide-right')
          el.classList.remove('container_child--slide-left')
        } else if (gap < 0) {
          el.classList.add('container_child--slide-left')
          el.classList.remove('container_child--slide-right')
        }
      }
    },
    stopDrag() {
      this.dragging = false
    },
  },
}
</script>

<style lang="sass">
.carousel
  width: inherit
  height: inherit
  overflow: hidden
  user-select: none
  position: relative

  &_slides
    display: flex
    width: inherit
    height: inherit

    & div:last-child
      order: 1

  &_nav
    top: 50%
    z-index: 1
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
    z-index: 1
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
