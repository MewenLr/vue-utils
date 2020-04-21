<template lang="pug">
  .group-radio
    a-radio(
      v-for="radio in listRadio"
      :group="group"
      :key="radio.value"
      :value="radio.value"
      :label="radioLabel(radio)"
      :label-position="labelPosition"
      :initial-state="radioChecked === radio.value"
      @pick-radio="pickRadio"
    )
</template>

<script>
import ARadio from '@/components/atoms/a-radio.vue'

export default {
  name: 'MGroupRadio',
  components: {
    ARadio,
  },
  props: {
    group: { type: String, required: true },
    listRadio: { type: Array, required: true },
    radioChecked: { type: String, default: '' },
    labelPosition: {
      type: String,
      default: 'beginning',
      validator: (prop) => ['beginning', 'end'].includes(prop),
    },
  },
  methods: {
    pickRadio(pickedRadio) {
      return this.$emit('pick-radio', pickedRadio)
    },
    radioLabel(radio) {
      return Object.prototype.hasOwnProperty.call(radio, 'label') ? radio.label : radio.value
    },
  },
}
</script>
