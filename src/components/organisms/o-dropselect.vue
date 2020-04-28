<template lang="pug">
  //- TODO: remove .stop event
  .dropselect(
    :class=`{
      'dropselect--open': open,
      'dropselect--error': error,
    }`
  )
    a-input.dropselect_input(
      type="text"
      button="open"
      ref="dropselectInput"
      id="dropselect-input"
      label="dropselect input"
      placeholder="Point de facturation"
      :debounce="false"
      :autocomplete="false"
      :clear-input-error="clearInputError"
      @input-blur="closeList"
      @input-focus="openList"
      @input-escape="blurInput"
      @input-error="handleError"
      @input-keyup="enableHover"
      @input-value="searchOption"
      @input-enter="selectOption"
      @input-arrow-down="nextOption"
      @input-arrow-up="previousOption"
      @cta-trigger="open ? blurInput() : focusInput()"
    )
    m-list.dropselect_list(
      v-show="open"
      ref="dropselectList"
      label="BusinessName"
      :target="target"
      :list="compListOptions"
      :not-found-msg="notFoundMsg"
      @hover-item="hoverOption"
      @select-item="selectOption"
    )
</template>

<script>
import AInput from '@/components/atoms/a-input.vue'
import MList from '@/components/molecules/m-list.vue'

export default {
  name: 'ODropselect',
  components: {
    MList,
    AInput,
  },
  props: {
    label: { type: String, required: true },
    options: { type: Array, required: true },
    placeholder: { type: String, default: '' },
    clearable: { type: Boolean, default: false },
    cancelMsg: { type: String, default: 'Annuler la sélection' },
    notFoundMsg: { type: String, default: 'Aucune option trouvée' },
  },
  data: () => ({
    error: '',
    open: false,
    inputValue: '',
    target: undefined,
    hoverEnabled: true,
    searchedOptions: null,
    clearInputError: false,
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
      this.open = false
      this.target = undefined
      this.clearInputError = true
      this.searchedOptions = null
      this.$refs.dropselectList.scrollTop = 0
      this.$refs.dropselectInput.$refs.inputField.value = this.inputValue
    },
    enableHover() {
      if (!this.hoverEnabled) this.hoverEnabled = true
    },
    hoverOption(index) {
      return this.hoverEnabled ? this.target = index : false
    },
    selectOption() {
      const option = this.compListOptions?.[this.target]?.[this.label]
      if (option === this.notFoundMsg) return false
      this.inputValue = option === this.cancelMsg ? '' : option
      return this.blurInput()
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

      const list = this.$refs.dropselectList
      const option = list.$refs[`listItem-${this.target}`][0]
      const bottomOption = option.$el.offsetTop + option.$el.getBoundingClientRect().height
      const scrollBottomPosition = list.$el.scrollTop + list.$el.getBoundingClientRect().height

      if (bottomOption >= scrollBottomPosition && bottomOption <= list.$el.scrollHeight) {
        const nbOptVisible = Math.floor(list.$el.offsetHeight / option.$el.offsetHeight) - 1
        list.$el.scrollTop = (this.target - nbOptVisible) * option.$el.getBoundingClientRect().height
        this.hoverEnabled = false
      }
    },
    previousOption() {
      if (this.target > 0) this.target -= 1

      const list = this.$refs.dropselectList
      const option = list.$refs[`listItem-${this.target}`][0]

      if (option.$el.offsetTop < list.$el.scrollTop) {
        list.$el.scrollTop = this.target * option.$el.getBoundingClientRect().height
        this.hoverEnabled = false
      }
    },
    handleError(err) {
      if (!err) return this.error = ''
      this.error = err
      this.clearInputError = false
      return this.searchedOptions = []
    },
  },
}
</script>

<style lang="sass">
.dropselect
  $self: &
  cursor: pointer
  position: relative
</style>
