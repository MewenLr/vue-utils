import Vue from 'vue'
import debounceDirective from '@/assets/scripts/directives/debounce'
import lazyLoadDirective from '@/assets/scripts/directives/lazy-load'
import clickOutDirective from '@/assets/scripts/directives/click-out'

const debounce = Vue.directive('debounce', debounceDirective)
const lazyLoad = Vue.directive('lazy-load', lazyLoadDirective)
const clickOut = Vue.directive('click-out', clickOutDirective)

export {
  debounce,
  lazyLoad,
  clickOut,
}
