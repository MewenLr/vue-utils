<template lang="pug">
  .home Hello from home

    o-carousel.home_carousel
      m-slide(v-for="n in slides" :key="n" :index="n - 1")
        a-image(
          :source="`https://i.picsum.photos/id/${n}/200/300.jpg`"
        )
    br
    button(@click="addSlide") Add Slide
    button(@click="removeSlide") Remove Slide


      //- m-slide
      //-   a-image(
      //-     placeholder='assets/img/surf-min.jpg'
      //-     source='assets/img/surf.jpg'
      //-   )
      //- m-slide
      //-   a-image(
      //-     source='assets/img/greece.jpg'
      //-     placeholder='assets/img/greece-min.jpg'
      //-   )
      //- m-slide
      //-   a-image(
      //-     source='assets/img/mountain.jpg'
      //-     placeholder='assets/img/mountain-min.jpg'
      //-   )

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
    // radioPicked: 'mirage',
    // radioPicked2: '',
    // listRadio: ['rafale', 'mirage', 's-16'],
    slides: 5,
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
    // updateRadio(radio) {
    //   this.radioPicked = radio
    // },
    // updateRadio2(radio) {
    //   this.radioPicked2 = radio
    // },
    // submitForm() {
    //   return false
    // },
    inputValue() {
    },
    addSlide() {
      this.slides += 1
    },
    removeSlide() {
      this.slides -= 1
    },
  },
}
</script>

<style lang="sass">
.home

  &_carousel
    width: 350px
    height: 250px

  &_image
    width: 250px
    height: 150px
</style>
