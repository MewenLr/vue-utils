<template lang="pug">
  .dropselect(
    v-click-out="toggleDropselect.bind(null, false)"
    :class="{ 'dropselect--visible': isOptionsVisible }"
    @click.self="toggleDropselect(!isOptionsVisible)"
  )
    input.dropselect_input(
      ref="input"
      placeholder="Point de facturation"
      @keyup="arrowHover($event)"
      @click="toggleDropselect(true)"
    )
    ul.dropselect_list(
      ref="list"
      v-show="isOptionsVisible"
      @scroll="reachBottom"
    )
      li.dropselect_list_option(
        v-for="(option, index) in listOptions"
        :key="option.id"
        :class="{ 'dropselect_list_option--hover': optionHovered === index}"
        @mouseenter="mouseHover(index)"
        @click.stop="selectOption(option)"
      )
        | {{ option[label] }}
</template>

<script>
export default {
  name: 'Dropselect',
  props: {
    label: { type: String, required: true },
    options: { type: Array, required: true },
    clearable: { type: Boolean, default: false },
  },
  data: () => ({
    inputValue: '',
    searchedOptions: null,
    isOptionsVisible: false,
    optionHovered: undefined,
    defaultMsg: 'Annuler la sélection',
  }),
  computed: {
    listOptions() {
      if (this.searchedOptions) return this.searchedOptions
      return this.clearable ? [{ [this.label]: this.defaultMsg }, ...this.options] : this.options
    },
  },
  watch: {
    isOptionsVisible(newVal) {
      if (newVal) this.$refs.input.value = ''
      else this.$refs.input.value = this.inputValue
    },
  },
  methods: {
    toggleDropselect(visible) {
      if (visible) this.$refs.input.focus()
      else {
        this.$refs.input.blur()
        this.searchedOptions = null
        this.optionHovered = undefined
      }
      this.isOptionsVisible = visible
    },
    selectOption(option) {
      if (option[this.label] === this.defaultMsg) this.inputValue = ''
      else this.inputValue = option[this.label]
      this.toggleDropselect(false)
      this.$emit('select-option', option)
    },
    arrowHover(event) {
      // key === arrow-bottom
      if (event.keyCode === 40 && this.optionHovered === undefined) this.optionHovered = 0
      else if (event.keyCode === 40 && this.optionHovered < (this.listOptions.length - 1)) this.optionHovered += 1
      // key === arrow-up
      else if (event.keyCode === 38 && this.optionHovered > 0) this.optionHovered -= 1
      // key === enter
      else if (event.keyCode === 13) this.selectOption(this.listOptions[this.optionHovered])
      // key === escape
      else if (event.keyCode === 27) this.toggleDropselect(false)
      // key !== shift, ctrl, alt && arrows
      else if (!(event.keyCode >= 16 && event.keyCode <= 18) && !(event.keyCode >= 37 && event.keyCode <= 40)) {
        const { value } = event.target
        const re = new RegExp(`^(${value})`, 'gi')
        this.searchedOptions = this.options.filter((opt) => (opt[this.label].match(re) ? opt : false)).map((opt) => opt)
        this.optionHovered = undefined
        if (this.searchedOptions.length === this.options.length) this.searchedOptions = null
      }
    },
    mouseHover(index) {
      this.optionHovered = index
    },
    reachBottom() {
      const threshold = this.$refs.list.scrollHeight - this.$refs.list.offsetHeight
      if (this.$refs.list.scrollTop >= threshold) this.$emit('reach-bottom')
    },
  },
}
</script>

<style lang="sass">
.dropselect
  cursor: pointer
  position: relative
  border-radius: 5px
  background-color: #fff
  border: 1px solid #e8e8e8
  transition: border linear .1s

  &:hover, &--visible
    border: 1px solid grey

  &::after
    top: 0
    right: 0
    color: #888
    content: '▼'
    height: 100%
    display: flex
    font-size: 14px
    font-weight: 700
    position: absolute
    margin-right: 15px
    align-items: center
    pointer-events: none
    justify-content: center
    transition: transform linear .1s
    font-family: monospace, sans-serif

  &--visible

    &::after
      transform: rotate(180deg)

  &_input
    border: none
    outline: none
    cursor: pointer
    font-size: 14px
    padding-left: 5px
    margin-right: 40px
    border-radius: 5px
    position: relative
    padding: 8px 0 8px 8px
    background-color: transparent
    font-family: Roboto, sans-serif

    &:focus
      cursor: text

  &_list
    margin: 0
    z-index: 1
    width: 100%
    overflow: auto
    padding: 10px 0
    max-height: 250px
    position: absolute
    border-radius: 10px
    top: calc(100% + 10px)
    background-color: #fff
    box-shadow: 0 0 10px 0 #b2b2b2

    &_option
      display: block
      cursor: pointer
      font-size: 14px
      color: #1482c5
      overflow: hidden
      padding: 10px 20px
      white-space: nowrap
      text-decoration: none
      text-overflow: ellipsis

      &--hover
        background: #e6e6e6
</style>
