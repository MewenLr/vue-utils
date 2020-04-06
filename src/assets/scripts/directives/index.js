import Vue from 'vue'
import lazyLoad from '@/assets/scripts/directives/lazy-load'
import clickOutside from '@/assets/scripts/directives/click-outside'

Vue.directive('lazy-load', lazyLoad)
Vue.directive('click-outside', clickOutside)
