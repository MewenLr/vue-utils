<template lang="pug">
  #app
    //- Dropselect(
    //-   label="BusinessName"
    //-   :options="list"
    //-   :clearable="clear"
    //- )
    //- Toggle(:checked="true")
    form(@submit.prevent="submitForm")
      GroupRadio(
        group="plane"
        :list-radio="listRadio"
        :radio-picked="radioPicked"
        @pick-radio="updateRadio"
      )
      br
      Radio(
        value="test"
        group="yo"
        :checked="radioPicked2 === 'test'"
        @pick-radio="updateRadio2"
      )
      Radio(
        value="test2"
        group="yo"
        :checked="radioPicked2 === 'test2'"
        @pick-radio="updateRadio2"
      )
      button(type="submit") Envoyer

  //- <div id="app">
  //-   //- Dropselect
  //-   <button @click="addOption">Add Option</button>
  //-   <br>
  //-   <button @click="toggleClearable">Toggle clearable</button>
  //-   <br>
  //-   <Dropselect
  //-     label="BusinessName"
  //-     :options="list"
  //-     :clearable="clear"
  //-   />

  //-   //- Toggle
  //-   <toggle
  //-     :initial-state="true"
  //-   />

  //-   //- Radio
  //-   <form @sumit.prevent="submitForm">
  //-     <group-radio
  //-       group="plane"
  //-       :list-radio="listRadio"
  //-       :radio-picked="radioPicked"
  //-       @pick-radio="updateRadio"
  //-     />
  //-     <br>
  //-     <radio
  //-       value="test"
  //-       group="yo"
  //-       :checked="radioPicked2 === 'test'"
  //-       @pick-radio="updateRadio2"
  //-     />
  //-     <radio
  //-       value="test2"
  //-       group="yo"
  //-       :checked="radioPicked2 === 'test2'"
  //-       @pick-radio="updateRadio2"
  //-     />
  //-     <button type="submit">Envoyer</button>
  //-   </form>
  //- </div>
</template>

<script>
import Radio from '@/components/Radio.vue'
import GroupRadio from '@/components/GroupRadio.vue'
// import Toggle from '@/components/Toggle.vue'
// import Dropselect from '@/components/Dropselect.vue'

export default {
  name: 'App',
  components: {
    Radio,
    GroupRadio,
    // Toggle,
    // Dropselect,
  },
  data: () => ({
    // clear: true,
    // list: [
    //   {
    //     id: 1,
    //     BusinessName: 'Atlantic SAS',
    //     Adress: '15 rue Le Grand',
    //   },
    //   {
    //     id: 2,
    //     BusinessName: 'German Export',
    //     Adress: '15 avenue Nothingrad',
    //   },
    //   {
    //     id: 3,
    //     BusinessName: 'AirWave Limited',
    //     Adress: '3 avenue Saint Martin',
    //   },
    // ],
    radioPicked: 'mirage',
    radioPicked2: '',
    listRadio: ['rafale', 'mirage', 's-16'],
  }),
  methods: {
    // addOption() {
    //   const id = Math.floor(Math.random() * 999999)
    //   this.list.push({
    //     id,
    //     BusinessName: 'AirWave Limited',
    //     Adress: '3 avenue Saint Martin',
    //   })
    // },
    // toggleClearable() {
    //   this.clear = !this.clear
    // },
    updateRadio(radio) {
      this.radioPicked = radio
    },
    updateRadio2(radio) {
      this.radioPicked2 = radio
    },
    submitForm() {
      return false
    },
  },
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
