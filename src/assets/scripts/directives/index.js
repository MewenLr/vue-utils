import Vue from 'vue'
import debounce from '@/assets/scripts/directives/debounce'
import lazyLoad from '@/assets/scripts/directives/lazy-load'
import clickOut from '@/assets/scripts/directives/click-out'

const debounceDirective = Vue.directive('debounce', debounce)
const lazyLoadDirective = Vue.directive('lazy-load', lazyLoad)
const clickOutDirective = Vue.directive('click-out', clickOut)

export {
  debounceDirective,
  lazyLoadDirective,
  clickOutDirective,
}
