<template>
  <div
    class="multiselect"
    :class="{ 'multiselect--visible': isSelectVisible }"
    @click.self="toggleMultiselect(!isSelectVisible)"
    v-click-outside.present="toggleMultiselect.bind(null, false)"
  >
    <input
      ref="input"
      class="multiselect__input"
      placeholder="Point de facturation"
      @click="toggleMultiselect(true)"
      @keyup="filterOption($event.target.value)"
    >
    <ul
      ref="list"
      class="multiselect__list"
      v-show="isSelectVisible"
      @scroll="reachBottom"
    >
      <li
        class="multiselect__list__option"
        v-for="option in listOptions"
        :key="option.id"
        @click.stop="selectOption(option)"
      >
        {{ option[label] }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Multiselect',
  props: {
    label: { type: String, required: true },
    options: { type: Array, required: true },
    clearable: { type: Boolean, default: false },
  },
  data: () => ({
    inputValue: '',
    isSelectVisible: false,
    defaultMsg: 'Annuler la sélection',
  }),
  computed: {
    listOptions() {
      const defaultObj = {}
      defaultObj[this.label] = this.defaultMsg
      return this.clearable ? [defaultObj, ...this.options] : this.options
    },
  },
  watch: {
    isSelectVisible(newVal) {
      if (newVal) this.$refs.input.value = ''
      else this.$refs.input.value = this.inputValue
    },
  },
  methods: {
    toggleMultiselect(visible) {
      this.isSelectVisible = visible
    },
    selectOption(option) {
      if (option[this.label] === this.defaultMsg) this.inputValue = ''
      else this.inputValue = option[this.label]
      this.isSelectVisible = false
      this.$emit('select-option', option)
    },
    reachBottom() {
      const threshold = this.$refs.list.scrollHeight - this.$refs.list.offsetHeight
      if (this.$refs.list.scrollTop >= threshold) this.$emit('reach-bottom')
    },
    filterOption(searchedOption) {
      console.log(searchedOption)
      const computOptions = this.listOptions.map((opt) => {
        console.log('here is opt >>', opt[this.label])
        // return opt[this.label].match(`/^[${searchedOption}]+/g`) ? opt : false
        console.log('here is regex >>', /^[Annuler]+/g.test(opt[this.label]))
        return /^[Annuler]+/g.test(opt[this.label]) ? opt : false
      })
      console.log('here is computOptions >>', computOptions)
      // searchedOption
      // this.listOptions.map(e)
      // option.match(`/^[${searchedOption}]+/g`)
      // return
    },
  },
}
</script>

<style lang="scss">
.multiselect {
  cursor: pointer;
  position: relative;
  background: #fff;
  border-radius: 5px;
  border: 1px solid #e8e8e8;
  transition: border linear .1s;

  &:hover, &--visible {
    border: 1px solid grey;
  }

  &::after {
    top: 0;
    right: 0;
    height: 100%;
    content: '▼';
    color: gray;
    display: flex;
    font-size: 14px;
    font-weight: 700;
    position: absolute;
    margin-right: 15px;
    align-items: center;
    pointer-events: none;
    justify-content: center;
    transition: transform linear .1s;
    font-family: monospace, sans-serif;
  }

  &--visible {

    &::after {
      transform: rotate(180deg);
    }
  }

  &__input {
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 14px;
    padding-left: 5px;
    margin-right:40px;
    border-radius: 5px;
    position: relative;
    padding: 8px 0 8px 8px;
    font-family: Montserrat, sans-serif;

    &:focus {
      cursor: text;
    }
  }

  &__list {
    margin: 0;
    z-index: 1;
    overflow: auto;
    padding: 10px 0;
    max-height: 250px;
    position: absolute;
    border-radius: 10px;
    top: calc(100% + 10px);
    width: calc(100% - 20px);
    background-color: #fff;
    box-shadow: 0 0 10px 0 #b2b2b2;

    &__option {
      display: block;
      cursor: pointer;
      font-size: 14px;
      color: #1482c5;
      overflow: hidden;
      padding: 10px 20px;
      white-space: nowrap;
      text-decoration: none;
      text-overflow: ellipsis;

      &:hover {
        background: #e6e6e6;
      }
    }
  }
}
</style>
