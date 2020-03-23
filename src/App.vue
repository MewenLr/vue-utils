<template>
  <div id="app">
    <button @click="addOption">Add Option</button>
    <br>
    <Multiselect
      label="BusinessName"
      :options="list"
      :clearable="true"
    />
  </div>
</template>

<script>
import Multiselect from '@/components/Multiselect.vue'

export default {
  name: 'App',
  components: {
    Multiselect,
  },
  data: () => ({
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
