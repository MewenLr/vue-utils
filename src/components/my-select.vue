<template lang="pug">
  .my-select(
    :class="{ 'my-select--open': open }"
  )
    input.my-select_input(
      ref="selectInput"
      :value="inputValue"
      :placeholder="placeholder"
      @focus="openList"
      @blur="closeList"
      @keyup="keyOperations"
    )
    button.my-select_button(
      @click="open ? closeList() : openList()"
    )
      | ▼
    ul.my-select_list(
        v-show="open"
      )
        li.my-select_list_option(
          v-for="option in compListOptions"
          :key="option.id"
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
    selected: false,
    searchedOptions: [],
    cancelMsg: 'Annuler la sélection',
  }),
  computed: {
    compListOptions() {
      if (this.searchedOptions.length) return this.searchedOptions
      if (this.clearable) return [{ [this.label]: this.cancelMsg }, ...this.options]
      return this.options
    },
    compInputValue() {
      if (!this.options.length) return ''
      if (this.open && !this.searchedOptions.length) return ''
      return this.inputValue
    },
  },
  methods: {
    openList() {
      this.open = true
      this.$refs.selectInput.focus()
      // this.$refs.selectInput.value = ''
    },
    closeList() {
      this.open = false
      this.searchedOptions = []
      this.$refs.selectInput.blur()
      // this.$refs.selectInput.value = this.inputValue
    },
    selectOption(option) {
      if (option[this.label] === this.cancelMsg) this.inputValue = ''
      else this.inputValue = option[this.label]
    },
    keyOperations(event) {
      // key === escape
      if (event.keyCode === 27) this.closeList()
      // key !== shift, ctrl, alt && arrows
      else if (!(event.keyCode >= 16 && event.keyCode <= 18) && !(event.keyCode >= 37 && event.keyCode <= 40)) {
        // const { value } = event.target
        this.inputValue = event.target.value
        const re = new RegExp(`^(${this.inputValue})`, 'gi')
        this.searchedOptions = this.options.filter((opt) => (opt[this.label].match(re) ? opt : false)).map((opt) => opt)
        if (this.searchedOptions.length === this.options.length) this.searchedOptions = []
      }
    },
  },
}
</script>

<style lang="sass">
.my-select
  $self: &
  height: 38px
  cursor: pointer
  position: relative
  border-radius: 5px
  background-color: #fff
  border: 1px solid #e8e8e8
  transition: border linear .1s

  &:hover, &--open
    border: 1px solid grey

  &--open

    #{ $self }_button
      transform: rotate(180deg)

  &_button
    color: #777
    width: 40px
    height: 100%
    border: none
    outline: none
    cursor: inherit
    background-color: transparent
    transition: transform linear .1s

  &_input
    border: none
    outline: none
    cursor: pointer
    font-size: 14px
    padding-left: 5px
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
