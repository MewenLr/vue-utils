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
    //-   @input-value="inputValue"
    //- )

    //- a-image.home_image(
    //-   placeholder='assets/img/surf-min.jpg'
    //-   source='assets/img/surf.jpg'
    //- )
    //- a-image.home_image(
    //-   source='assets/img/greece.jpg'
    //-   placeholder='assets/img/greece-min.jpg'
    //- )

    //- br
    //- br
    //- button(@click="removeOption") Remove Option
    //- br
    //- br
    //- button(@click="addOption") Add Option
    //- br
    //- br
    //- button(@click="toggleClearable") Toggle Clearable
    //- br
    //- br
    //- o-dropselect(
    //-   label="BusinessName"
    //-   placeholder="Point de facturation"
    //-   :options="list"
    //-   :clearable="clear"
    //- )

    //- br
    //- a-toggle(
    //-   label="testLabel"
    //-   :initial-state="true"
    //-   :label-position="'end'"
    //- )

    form(@submit.prevent="submitForm")
      m-group-radio(
        group="plane"
        :label-enabled="true"
        :list-radio="listRadio"
        :label-position="'end'"
        :radio-checked="radioChecked"
        @pick-radio="pickeRadio"
      )
      br
      a-radio(
        group="yo"
        label="test"
        value="test"
        :label-position="'end'"
        :initial-state="radioChecked2 === 'test'"
        @pick-radio="pickeRadio2"
      )
      a-radio(
        group="yo"
        label="test2"
        value="test2"
        :initial-state="radioChecked2 === 'test2'"
        @pick-radio="pickeRadio2"
      )
      button(type="submit") Envoyer
</template>

<script>
import AInput from '@/components/atoms/a-input.vue'
import AImage from '@/components/atoms/a-image.vue'
import ARadio from '@/components/atoms/a-radio.vue'
import AToggle from '@/components/atoms/a-toggle.vue'
import MSlide from '@/components/molecules/m-slide.vue'
import OCarousel from '@/components/organisms/o-carousel.vue'
import ODropselect from '@/components/organisms/o-dropselect.vue'
import MGroupRadio from '@/components/molecules/m-group-radio.vue'

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
    MGroupRadio,
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
      { value: 'mirage' },
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
        this.list.push({
          id: i,
          BusinessName: `test-${i}`,
        })
      }
    },
    toggleClearable() {
      this.clear = !this.clear
    },
    pickeRadio(radio) {
      this.radioPicked = radio
    },
    pickeRadio2(radio) {
      this.radioPicked2 = radio
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
