<template lang="pug">
  #app
    div(style="display: flex;")
      router-link(:to="'/about'") About |
      router-link(:to="'/'") Home
    router-view
</template>

<script>

export default {
  name: 'App',
}
</script>

<style lang="sass">
body
  margin: 0

#app
  width: 100vw
  height: 100vh
  display: flex
  align-items: center
  flex-direction: column
  justify-content: center
  background-color: lightblue
  font-family: Avenir, Helvetica, Arial, sans-serif
</style>
