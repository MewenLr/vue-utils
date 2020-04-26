<template lang="pug">
  ul.m-list(
    v-show="open"
  )
    a-item(
      v-for="(item, index) in listItems"
      :key="setKey(index)"
      :ref="`list_item-${index}`"
      @mousedown="emitEvent('select-item', item, $event)"
      @mouseenter="emitEvent('hover-item', index, $event)"
    )
    li.dropselect_list_option(
      :ref="`dropselectItem-${index}`"
      :class="{ 'dropselect_list_option--hover': (target === index) && (option[label] !== notFoundMsg) }"
    )
      | {{ option[label] }}
  //- ul.m-list(
  //-     ref="dropselectList"
  //-     v-show="open"
  //-   )
  //-     li.dropselect_list_option(
  //-       v-for="(option, index) in compListOptions"
  //-       :key="option.id"
  //-       :ref="`dropselectItem-${index}`"
  //-       :class="{ 'dropselect_list_option--hover': (target === index) && (option[label] !== notFoundMsg) }"
  //-       @mouseenter="hoverOption(index)"
  //-       @mousedown.prevent="selectOption($event, option)"
  //-     )
  //-       | {{ option[label] }}
</template>

<script>
export default {
  name: 'MList',
  props: {
    key: { type: String, default: undefined },
    listItems: { type: Array, required: true },
  },
  methods: {
    setKey(index) {
      if (this.key) return this.listItem[index][this.key]
      if (this.key === '') return this.listItem[index]
      return index
    },
    emitEvent(type, payload, event) {
      return this.$emit(type, payload, event)
    },
  },
}
</script>

<style lang="sass">
.m-list
</style>
