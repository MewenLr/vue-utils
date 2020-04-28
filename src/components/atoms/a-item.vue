<template lang="pug">
  li.item(
    @mousedown="$emit('select-item', item, $event)"
    @mouseenter="$emit('hover-item', index, $event)"
    :class="{ 'item--hover': (target === index) && (item[label] !== notFoundMsg) }"
  )
    | {{ item[label] }}
</template>

<script>
export default {
  name: 'AItem',
  props: {
    item: { type: Object, required: true },
    index: { type: Number, required: true },
    label: { type: String, required: true },
    target: { type: Number, default: undefined },
    notFoundMsg: { type: String, default: 'Aucune option trouvée' },
  },
}
</script>

<style lang="sass">
.item
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
