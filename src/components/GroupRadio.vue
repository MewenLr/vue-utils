<template lang="pug">
  .group-radio
    radio(
      v-for="value in listRadio"
      :key="value"
      :group="group"
      :value="value"
      :checked="radioPicked === value"
      @pick-radio="pickRadio"
    )
</template>

<script>
import Radio from '@/components/Radio.vue'

export default {
  components: {
    Radio,
  },
  props: {
    group: { type: String, required: true },
    listRadio: { type: Array, required: true },
    radioPicked: { type: String, default: '' },
  },
  methods: {
    pickRadio(radio) {
      return this.$emit('pick-radio', radio)
    },
  },
}
</script>
