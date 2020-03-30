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
import radio from '@/components/radio.vue'

export default {
  components: {
    radio,
  },
  props: {
    group: { type: String, required: true },
    listRadio: { type: Array, required: true },
    radioPicked: { type: String, default: '' },
  },
  methods: {
    pickRadio(pickedRadio) {
      return this.$emit('pick-radio', pickedRadio)
    },
  },
}
</script>
