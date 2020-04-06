<template>
  <div
    class="image"
    v-lazy-load="lazy"
  >
    <img
      v-if="placeholder"
      class="image_placeholder"
      :src="require(`@/${placeholder}`)"
    />
    <img
      class="image_picture"
      :alt="alt"
      :data-url="require(`@/${source}`)"
    >
  </div>
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
}
</script>

<style lang="sass">
.image
  $self: &
  width: 250px
  height: 150px
  margin-bottom: 1500px

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
