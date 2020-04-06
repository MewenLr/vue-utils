<template lang="pug">
  .home Hello from home
    a-image(
      placeholder='assets/img/surf-min.jpg'
      source='assets/img/surf.jpg'
    )
    a-image(
      source='assets/img/greece.jpg'
      placeholder='assets/img/greece-min.jpg'
    )

    //- placeholder='assets/img/greece-min.jpg'
    //- img(
    //-   class="image__item"
    //-   alt="random image"
    //-   src="@/assets/img/surf.jpg"
    //- )

    //- button(@click="removeOption") Remove Option
    //- br
    //- button(@click="addOption") Add Option
    //- br
    //- button(@click="toggleClearable") Toggle Clearable
    //- br
    //- dropselect(
    //-   label="BusinessName"
    //-   :options="list"
    //-   :clearable="clear"
    //- )
    //- br
    //- my-select(
    //-   label="BusinessName"
    //-   placeholder="Point de facturation"
    //-   :options="list"
    //-   :clearable="clear"
    //- )

    //- toggle(:checked="true")

    //- form(@submit.prevent="submitForm")
    //-   group-radio(
    //-     group="plane"
    //-     :list-radio="listRadio"
    //-     :radio-picked="radioPicked"
    //-     @pick-radio="updateRadio"
    //-   )
    //-   br
    //-   radio(
    //-     value="test"
    //-     group="yo"
    //-     :checked="radioPicked2 === 'test'"
    //-     @pick-radio="updateRadio2"
    //-   )
    //-   radio(
    //-     value="test2"
    //-     group="yo"
    //-     :checked="radioPicked2 === 'test2'"
    //-     @pick-radio="updateRadio2"
    //-   )
    //-   button(type="submit") Envoyer
</template>

<script>
import AImage from '@/components/a-image.vue'
// import Radio from '@/components/radio.vue'
// import GroupRadio from '@/components/group-radio.vue'
// import Toggle from '@/components/toggle.vue'
// import Dropselect from '@/components/dropselect.vue'
// import MySelect from '@/components/my-select.vue'

export default {
  name: 'Home',
  components: {
    AImage,
    // Radio,
    // GroupRadio,
    // Toggle,
    // Dropselect,
    // MySelect,
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
    // radioPicked: 'mirage',
    // radioPicked2: '',
    // listRadio: ['rafale', 'mirage', 's-16'],
  }),
  methods: {
    removeOption() {
      this.list = []
    },
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
    // updateRadio(radio) {
    //   this.radioPicked = radio
    // },
    // updateRadio2(radio) {
    //   this.radioPicked2 = radio
    // },
    // submitForm() {
    //   return false
    // },
  },
}
</script>

<style lang="sass">
.home
</style>
