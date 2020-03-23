<template>
  <div id="app">
    <button @click="addOption">Add Option</button>
    <br>
    <button @click="toggleClearable">Toggle clearable</button>
    <br>
    <Dropselect
      label="BusinessName"
      :options="list"
      :clearable="clear"
    />
  </div>
</template>

<script>
import Dropselect from '@/components/Dropselect.vue'

export default {
  name: 'App',
  components: {
    Dropselect,
  },
  data: () => ({
    clear: true,
    list: [
      {
        id: 1,
        BusinessName: 'Atlantic SAS',
        Adress: '15 rue Le Grand',
      },
      {
        id: 2,
        BusinessName: 'German Export',
        Adress: '15 avenue Nothingrad',
      },
      {
        id: 3,
        BusinessName: 'AirWave Limited',
        Adress: '3 avenue Saint Martin',
      },
    ],
  }),
  methods: {
    addOption() {
      const id = Math.floor(Math.random() * 999999)
      this.list.push({
        id,
        BusinessName: 'AirWave Limited',
        Adress: '3 avenue Saint Martin',
      })
    },
    toggleClearable() {
      this.clear = !this.clear
    },
  },
}
</script>

<style lang="scss">
body {
  margin: 0;
}
#app {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: lightblue;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
