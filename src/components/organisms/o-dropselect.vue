<template lang="pug">
  //- TODO: check accessibility && outsource list
  //- Add label
  //- && fix HoverOption not working when remove and add options. Prob enableHOver stay false
  .dropselect(
    :class="{ 'dropselect--open': open }"
  )
    a-input(
      type="text"
      autocomplete="off"
      ref="dropselectInput"
      placeholder="Point de facturation"
      :button="'arrow'"
      @input-blur="closeList"
      @input-focus="openList"
      @input-escape="blurInput"
      @input-error="handleError"
      @input-keyup="enableHover"
      @input-value="searchOption"
      @input-enter="selectOption"
      @input-arrow-down="nextOption"
      @input-arrow-up="previousOption"
      @mousedown-button="open ? blurInput() : focusInput()"
    )
    ul.dropselect_list(
      ref="dropselectList"
      v-show="open"
    )
      li.dropselect_list_option(
        v-for="(option, index) in compListOptions"
        :key="option.id"
        :ref="`dropselectItem-${index}`"
        :class="{ 'dropselect_list_option--hover': (target === index) && (option[label] !== notFoundMsg) }"
        @mouseenter="hoverOption(index)"
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
    hoverEnabled: true,
    searchedOptions: null,
    cancelMsg: 'Annuler la sélection',
    notFoundMsg: 'Aucune option trouvée',
  }),
  computed: {
    compListOptions() {
      if (this.searchedOptions && !this.searchedOptions.length) return [{ [this.label]: this.notFoundMsg }]
      if (this.searchedOptions) return this.searchedOptions
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
    focusInput() {
      this.$refs.dropselectInput.$refs.inputField.focus()
    },
    blurInput() {
      this.$refs.dropselectInput.$refs.inputField.blur()
    },
    openList() {
      this.target = 0
      this.open = true
      this.$refs.dropselectInput.$refs.inputField.value = ''
    },
    closeList() {
      this.error = ''
      this.open = false
      this.target = undefined
      this.searchedOptions = null
      this.$refs.dropselectList.scrollTo(0, 0)
      this.$refs.dropselectInput.$refs.inputField.value = this.inputValue
    },
    selectOption() {
      const option = this.compListOptions?.[this.target]?.[this.label]
      if (option === this.notFoundMsg) return false
      this.inputValue = option === this.cancelMsg ? '' : option
      return this.blurInput()
    },
    searchOption(event) {
      if (this.error) this.error = ''

      this.target = 0
      const { value } = event.target
      const re = new RegExp(`^(${value})`, 'gi')
      this.searchedOptions = this.options.filter((opt) => (opt[this.label].match(re) ? opt : false)).map((opt) => opt)
      if (this.searchedOptions.length === this.options.length) this.searchedOptions = null
    },
    nextOption() {
      if (this.target === undefined) this.target = 0
      else if (this.target < (this.compListOptions.length - 1)) this.target += 1

      const list = this.$refs.dropselectList
      const option = this.$refs[`dropselectItem-${this.target}`][0]
      const bottomOption = option.offsetTop + option.offsetHeight
      const scrollBottomPosition = list.scrollTop + list.offsetHeight
      const nbOptVisible = Math.floor(list.offsetHeight / option.offsetHeight) - 1

      if (bottomOption >= scrollBottomPosition) {
        list.scrollTo(0, (this.target - nbOptVisible) * option.offsetHeight)
        this.hoverEnabled = false
      }
    },
    previousOption() {
      if (this.target > 0) this.target -= 1

      const list = this.$refs.dropselectList
      const option = this.$refs[`dropselectItem-${this.target}`][0]

      if (option.offsetTop < list.scrollTop) {
        list.scrollTo(0, this.target * option.offsetHeight)
        this.hoverEnabled = false
      }
    },
    enableHover() {
      if (!this.hoverEnabled) this.hoverEnabled = true
    },
    hoverOption(index) {
      return this.hoverEnabled ? this.target = index : false
    },
    handleError() {
      this.searchedOptions = []
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

  &_list
    z-index: 1
    width: 100%
    overflow: auto
    padding: 10px 0
    min-height: 36px
    max-height: 250px
    position: relative
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
