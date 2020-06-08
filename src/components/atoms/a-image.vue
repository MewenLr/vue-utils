<template lang="pug">
  .image(v-lazy-load="lazy")
    img.image_placeholder(
      v-if="placeholder"
      :src="compPlaceholder ? source : require(`@/assets/img/${placeholder}`)"
    )
    img.image_picture(
      :alt="alt"
      :data-url="compSource ? source : require(`@/assets/img/${source}`)"
    )
</template>

<script>
export default {
  name: 'AImage',
  props: {
    alt: { type: String, default: '' },
    lazy: { type: Boolean, default: true },
    source: { type: String, required: true },
    placeholder: { type: String, default: '' },
  },
  computed: {
    compSource() {
      return /^http/.test(this.source)
    },
    compPlaceholder() {
      return /^http/.test(this.placeholder)
    },
  },
}
</script>

<style lang="sass">
.image
  width: inherit
  height: inherit

  &_placeholder, &_picture
    width: inherit
    height: inherit

  &_placeholder
    z-index: 0
    position: absolute

  &_picture
    z-index: 1
    position: relative
</style>
