<template lang="pug">
  .dropselect(
    :class="{ 'dropselect--open': open }"
  )
    a-input(
      type="text"
      ref="dropselectInput"
      placeholder="Point de facturation"
      :button="'arrow'"
      @input-blur="closeList"
      @input-focus="openList"
      @input-down="nextOption"
      @input-escape="closeList"
      @input-up="previousOption"
      @input-value="searchOption"
      @input-enter="selectOption"
      @mousedown-button="!open ? openList($event) : false"
    )
    ul.dropselect_list(
      ref="dropselectList"
      v-show="open"
      @scroll="reachBottom"
    )
      li.dropselect_list_option(
        v-for="(option, index) in compListOptions"
        :key="option.id"
        :ref="`dropselectItem-${index}`"
        :class="{ 'dropselect_list_option--hover': target === index && option[label] !== notFoundMsg }"
        @mouseenter="target = index"
        @mousedown.prevent="selectOption($event, option)"
      )
        | {{ option[label] }}
</template>

<script>
import AInput from '@/components/atoms/a-input.vue'

export default {
  name: 'ODropselect',
  components: {
    AInput,
  },
  props: {
    label: { type: String, required: true },
    options: { type: Array, required: true },
    placeholder: { type: String, default: '' },
    clearable: { type: Boolean, default: false },
  },
  data: () => ({
    open: false,
    inputValue: '',
    target: undefined,
    scrollPosition: 0,
    searchedOptions: null,
    cancelMsg: 'Annuler la sélection',
    notFoundMsg: 'Aucune option trouvée',
  }),
  computed: {
    compListOptions() {
      if (this.searchedOptions) {
        if (!this.searchedOptions.length) return [{ [this.label]: this.notFoundMsg }]
        return this.searchedOptions
      }
      if (this.clearable) return [{ [this.label]: this.cancelMsg }, ...this.options]
      return this.options
    },
  },
  watch: {
    options(newVal) {
      if (!newVal.length) {
        this.inputValue = ''
        this.$refs.dropselectInput.$refs.inputField.value = ''
      }
    },
  },
  methods: {
    openList(event) {
      event.preventDefault()
      if (event?.type === 'focus') {
        this.target = 0
        this.open = true
        return this.$refs.dropselectInput.$refs.inputField.value = ''
      }
      return this.$refs.dropselectInput.$refs.inputField.focus()
    },
    closeList(event) {
      if (event?.type === 'blur') {
        this.open = false
        this.target = undefined
        this.scrollPosition = 0
        this.searchedOptions = null
        this.$refs.dropselectList.scrollTo(0, this.scrollPosition)
        this.$refs.dropselectInput.$refs.inputField.value = this.inputValue
      }
      /* force blur */ this.$refs.dropselectInput.$refs.inputField.blur()
    },
    selectOption() {
      const opt = this.compListOptions?.[this.target]?.[this.label]
      if (opt === this.notFoundMsg) return false
      this.inputValue = (opt === this.cancelMsg || !opt) ? '' : opt
      return this.closeList()
    },
    searchOption(event) {
      this.target = 0
      const { value } = event.target
      const re = new RegExp(`^(${value})`, 'gi')
      this.searchedOptions = this.options.filter((opt) => (opt[this.label].match(re) ? opt : false)).map((opt) => opt)
      if (this.searchedOptions.length === this.options.length) this.searchedOptions = null
    },
    nextOption() {
      if (this.target === undefined) this.target = 0
      else if (this.target < (this.compListOptions.length - 1)) this.target += 1

      const option = this.$refs[`dropselectItem-${this.target}`][0]
      const bottomOption = option.offsetTop + option.offsetHeight
      if (bottomOption >= (this.$refs.dropselectList.offsetHeight + this.scrollPosition)) {
        this.scrollPosition += option.offsetHeight
        this.$refs.dropselectList.scrollTo(0, this.scrollPosition)
      }
    },
    previousOption() {
      if (this.target > 0) this.target -= 1

      const option = this.$refs[`dropselectItem-${this.target}`][0]
      const topOption = option.offsetTop
      if (topOption < this.scrollPosition) {
        this.scrollPosition -= option.offsetHeight
        this.$refs.dropselectList.scrollTo(0, this.scrollPosition)
      }
    },
    reachBottom() {
      const bottomList = this.$refs.dropselectList.scrollHeight - this.$refs.dropselectList.offsetHeight
      if (this.$refs.dropselectList.scrollTop >= bottomList) this.$emit('reach-bottom')
    },
  },
}
</script>

<style lang="sass">
.dropselect
  $self: &
  cursor: pointer
  position: relative

  &:hover, &--open

    #{ $self }_input
      border: 1px solid grey

  &--open

    #{ $self }_mask
      height: 0

  &_mask
    top: 0
    left: 0
    width: 100%
    height: 100%
    cursor: inherit
    position: absolute
    background-color: rgba(coral, .5)

  &_list
    margin: 0
    z-index: 1
    width: 100%
    overflow: auto
    padding: 10px 0
    min-height: 36px
    max-height: 250px
    position: absolute
    border-radius: 5px
    top: calc(100% + 10px)
    background-color: #fff
    box-shadow: 0 0 10px 0 #b2b2b2

    &_option
      color: #1482c5
      display: block
      cursor: pointer
      font-size: 14px
      overflow: hidden
      padding: 10px 20px
      white-space: nowrap
      text-decoration: none
      text-overflow: ellipsis

      &--hover
        background: #e6e6e6
</style>
