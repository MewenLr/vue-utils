<template>
  <div
    class="multiselect"
    :class="{ 'multiselect--visible': isSelectVisible }"
    @click="openMultiselect"
    v-click-outside="closeMultiselect"
  >
    <input
      ref="input"
      class="multiselect__input"
      placeholder="Point de facturation"
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
    openMultiselect() {
      this.isSelectVisible = true
    },
    closeMultiselect() {
      this.isSelectVisible = false
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
  },
}
</script>

<style lang="scss">
.multiselect {
  width: 150px;
  cursor: pointer;
  min-height: 40px;
  position: relative;
  background: #fff;
  border-radius: 20px;
  display: inline-block;
  padding: 8px 40px 0px 8px;
  border: 1px solid #e8e8e8;
  transition: border linear .1s;

  &:hover, &--visible {
    border: 1px solid grey;
  }

  &::after {
    top: 0;
    right: 0;
    z-index: 50;
    width: 40px;
    height: 40px;
    color: gray;
    content: '>';
    display: flex;
    font-size: 16px;
    font-weight: 700;
    position: absolute;
    align-items: center;
    pointer-events: none;
    justify-content: center;
    transform: rotate(90deg);
    transition: transform linear .1s;
    font-family: monospace, sans-serif;
  }

  &--visible {

    &::after {
      transform: rotate(-90deg);
    }
  }

  &__input {
    margin: 0;
    border: none;
    outline: none;
    display: block;
    cursor: pointer;
    font-size: 14px;
    padding-left: 5px;
    position: relative;
    font-family: Montserrat, sans-serif;

    &:focus {
      cursor: text;
    }
  }

  &__list {
    z-index: 1;
    width: 120%;
    height: 250px;
    padding: 10px;
    overflow: auto;
    position: absolute;
    border-radius: 10px;
    top: calc(100% + 10px);
    background-color: #fff;
    box-shadow: 0 0 10px 0 #b2b2b2;

    &__option {
      color: black;
      padding: 8px;
      color: #1482c5;
      display: block;
      cursor: pointer;
      font-size: 14px;
      overflow: hidden;
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
