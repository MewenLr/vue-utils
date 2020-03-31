<template lang="pug">
  .my-select(
    :class="{ 'my-select--open': open }"
  )
    input.my-select_input(
      ref="selectInput"
      :placeholder="placeholder"
      @blur.prevent="closeList"
      @focus.prevent="openList"
      @keyup.esc.prevent="blurInput"
      @keydown.down.prevent="nextOption"
      @keydown.up.prevent="previousOption"
      @input="searchOption($event.target.value)"
    )
    button.my-select_button(
      @mousedown.prevent="open ? blurInput() : focusInput()"
    )
      | ▼
    ul.my-select_list(
      v-show="open"
    )
      li.my-select_list_option(
        v-for="(option, index) in compListOptions"
        :key="option.id"
        :class="{ 'my-select_list_option--hover': target === index }"
        @mouseenter="target = index"
        @mousedown="selectOption(option)"
      )
        | {{ option[label] }}
</template>

<script>
export default {
  name: 'MySelect',
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
        this.$refs.selectInput.value = ''
      }
    },
  },
  methods: {
    focusInput() {
      console.log('here in focus')
      this.$refs.selectInput.focus()
    },
    blurInput() {
      console.log('here in blur')
      this.$refs.selectInput.blur()
    },
    openList() {
      console.log('here in open')
      this.open = true
      this.$refs.selectInput.value = ''
    },
    closeList() {
      console.log('here in close')
      this.open = false
      this.taget = undefined
      this.searchedOptions = null
      this.$refs.selectInput.value = this.inputValue
    },
    selectOption(option) {
      console.log('here in select')
      if (option[this.label] === this.cancelMsg) this.inputValue = ''
      else this.inputValue = option[this.label]
    },
    searchOption(value) {
      console.log('here is value >>', value)
      const re = new RegExp(`^(${value})`, 'gi')
      this.searchedOptions = this.options.filter((opt) => (opt[this.label].match(re) ? opt : false)).map((opt) => opt)
      if (this.searchedOptions.length === this.options.length) this.searchedOptions = null
    },
    nextOption() {
      if (this.target === undefined) this.target = 0
      else if (this.target < (this.compListOptions.length - 1)) this.target += 1
    },
    previousOption() {
      if (this.target > 0) this.target -= 1
    },
  },
}
</script>

<style lang="sass">
.my-select
  $self: &
  cursor: pointer
  position: relative

  &:hover, &--open

    #{ $self }_input
      border: 1px solid grey

  &--open

    #{ $self }_button
      transform: rotate(180deg)

  &_button
    top: 0
    right: 0
    color: #777
    width: 40px
    height: 100%
    border: none
    outline: none
    cursor: inherit
    position: absolute
    background-color: transparent
    transition: transform linear .1s

  &_input
    height: 34px
    border: none
    outline: none
    font-size: 14px
    border-radius: 5px
    position: relative
    padding: 0 40px 0 8px
    background-color: #fff
    border: 1px solid #e8e8e8
    transition: border linear .1s
    font-family: Roboto, sans-serif

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
