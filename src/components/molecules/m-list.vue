<template lang="pug">
  //- TODO: allow list for simple array
  ul.list
    a-item.list_item(
      v-for="(item, index) in list"
      :item="item"
      :label="label"
      :index="index"
      :target="target"
      :ref="`listItem-${index}`"
      :key="item[label] || index"
      :not-found-msg="notFoundMsg"
      @hover-item="hoverItem"
      @select-item="selectItem"
    )
</template>

<script>
import AItem from '@/components/atoms/a-item.vue'

export default {
  name: 'MList',
  components: {
    AItem,
  },
  props: {
    list: { type: Array, required: true },
    label: { type: String, required: true },
    target: { type: Number, default: undefined },
    notFoundMsg: { type: String, default: 'Aucune option trouvée' },
  },
  methods: {
    selectItem(payload, event) {
      this.$emit('select-item', payload, event)
    },
    hoverItem(payload, event) {
      this.$emit('hover-item', payload, event)
    },
  },
}
</script>

<style lang="sass">
.list
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
</style>
