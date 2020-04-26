<template lang="pug">
  .home
    | Hello from home
    br

    //- o-carousel.home_carousel
    //-   m-slide(v-for="(img, index) in slides" :key="img")
    //-     a-image(
    //-       :source="img"
    //-     )

    //- a-input(
    //-   id="test-input"
    //-   label="Test input"
    //-   @input-value="inputValue"
    //- )

    //- a-image.home_image(
    //-   source='https://inqeo.s3.amazonaws.com/FOTOWALLS-PRINTS/G8/ROOM/JPG/FW-1197-G8-ROOM.jpg'
    //- )
    //- a-image.home_image(
    //-   placeholder='assets/img/surf-min.jpg'
    //-   source='assets/img/surf.jpg'
    //- )
    //- a-image.home_image(
    //-   source='assets/img/greece.jpg'
    //-   placeholder='assets/img/greece-min.jpg'
    //- )

    br
    br
    button(@click="removeOption") Remove Option
    br
    br
    button(@click="addOption") Add Option
    br
    br
    button(@click="toggleClearable") Toggle Clearable
    br
    br
    o-dropselect(
      label="BusinessName"
      placeholder="Point de facturation"
      :options="list"
      :clearable="clear"
    )

    //- br
    //- a-toggle(
    //-   id="test-label"
    //-   label="testLabel"
    //-   :toggle-checked="true"
    //-   :label-position="'end'"
    //- )

    //- form(@submit.prevent="submitForm")
    //-   .home_group-radio
    //-     a-radio(
    //-       v-for="radio in listRadio"
    //-       group="plane"
    //-       :label="radio.label"
    //-       :value="radio.value"
    //-       :label-position="'end'"
    //-       :id="`radio-${radio.value}`"
    //-       :radio-checked="radio.value === radioChecked"
    //-       @pick-radio="pickeRadio"
    //-     )
    //-   br
    //-   a-radio(
    //-     group="yo"
    //-     label="test"
    //-     value="test"
    //-     :label-position="'end'"
    //-     id="radio-test"
    //-     :radio-checked="'test' === radioChecked2"
    //-     @pick-radio="pickeRadio2"
    //-   )
    //-   a-radio(
    //-     group="yo"
    //-     label="test2"
    //-     value="test2"
    //-     id="radio-test2"
    //-     :radio-checked="'test2' === radioChecked2"
    //-     @pick-radio="pickeRadio2"
    //-   )
    //-   button(type="submit") Envoyer
</template>

<script>
import AInput from '@/components/atoms/a-input.vue'
import AImage from '@/components/atoms/a-image.vue'
import ARadio from '@/components/atoms/a-radio.vue'
import AToggle from '@/components/atoms/a-toggle.vue'
import MSlide from '@/components/molecules/m-slide.vue'
import OCarousel from '@/components/organisms/o-carousel.vue'
import ODropselect from '@/components/organisms/o-dropselect.vue'

export default {
  name: 'PHome',
  components: {
    AInput,
    AImage,
    ARadio,
    MSlide,
    AToggle,
    OCarousel,
    ODropselect,
  },
  data: () => ({
    clear: true,
    list: [
      {
        id: 100,
        BusinessName: 'Atlantic SAS',
        Adress: '15 rue Le Grand',
      },
      {
        id: 200,
        BusinessName: 'German Export',
        Adress: '15 avenue Nothingrad',
      },
      {
        id: 300,
        BusinessName: 'AirWave Limited',
        Adress: '3 avenue Saint Martin',
      },
    ],
    radioChecked: 'mirage',
    radioChecked2: '',
    listRadio: [
      { value: 'rafale', label: 'labelRafale' },
      { value: 'mirage', label: 'labelMirage' },
      { value: 's-16', label: 'labelS-16' },
    ],
    slides: [
      'assets/img/surf.jpg',
      'assets/img/mountain.jpg',
      'assets/img/greece.jpg',
      'assets/img/terrance.jpg',
      'assets/img/snow.jpg',
    ],
  }),
  methods: {
    removeOption() {
      this.list = []
    },
    addOption() {
      for (let i = 0; i < 20; i += 1) {
        const rand = Math.floor(900000 * Math.random()) + 100000
        this.list.push({
          id: rand,
          BusinessName: `test-${i}`,
        })
      }
    },
    toggleClearable() {
      this.clear = !this.clear
    },
    pickeRadio(radio) {
      this.radioChecked = radio
    },
    pickeRadio2(radio) {
      this.radioChecked2 = radio
    },
    submitForm() {
      return false
    },
    inputValue() { },
  },
}
</script>

<style lang="sass">
.home

  &_carousel
    width: 850px
    height: 650px

  &_image
    width: 250px
    height: 150px
</style>
