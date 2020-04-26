<template lang="pug">
  li.a-item
    | {{ item[label] }}
  //- li.a-item(
  //-   v-for="(item, index) in listItem"
  //-   :key="compKey"
  //-   :ref="`dropselectItem-${index}`"
  //-   :class="{ 'dropselect_list_option--hover': (target === index) && (option[label] !== notFoundMsg) }"
  //-   @mouseenter="hoverOption(index)"
  //-   @mousedown.prevent="selectOption($event, option)"
  //- )
  //-   | {{ option[label] }}
</template>

<script>
export default {
  name: 'AItem',
  props: {
    item: {
      type: Object,
      required: true,
      validator: (prop) => Object.prototype.isPrototypeOf.call(prop, 'label'),
    },
  },
}
</script>

<style lang="sass">
.a-item
</style>
