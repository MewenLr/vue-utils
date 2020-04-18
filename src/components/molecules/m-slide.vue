<template lang="pug">
  .slide(ref="slide")
    slot
</template>

<script>
export default {
  name: 'MSlide',
}
</script>

<style lang="sass">
.slide
  width: inherit
  height: inherit
  position: absolute
</style>
