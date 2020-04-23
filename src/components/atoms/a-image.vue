<template lang="pug">
  .image(v-lazy-load="lazy")
    img.image_placeholder(
      v-if="placeholder"
      :src="compPlaceholder"
    )
    img.image_picture(
      :alt="alt"
      :data-url="compSource"
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
    /* eslint-disable import/no-dynamic-require, global-require */
    compSource() {
      if (/^http/.test(this.source)) return this.source
      return require(`@/${this.source}`)
    },
    compPlaceholder() {
      if (/^http/.test(this.placeholder)) return this.placeholder
      return require(`@/${this.placeholder}`)
    }, /* eslint-enable */
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
