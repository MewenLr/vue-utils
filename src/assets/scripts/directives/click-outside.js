import Vue from 'vue'

export default Vue.directive('click-outside', {
  bind: (el, binding, vNode) => {
    if (typeof binding.value !== 'function') {
      const compName = vNode.context.name
      let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`
      if (compName) { warn += `Found in component '${compName}'` }
      console.warn(warn)
    }
    const { bubble } = binding.modifiers
    const handler = (e) => {
      if (bubble || (!el.contains(e.target) && el !== e.target)) binding.value(e)
    }
    el.clickOutsideAction = handler
    document.addEventListener('click', handler)
  },
  unbind: (el) => {
    document.removeEventListener('click', el.clickOutsideAction)
    el.clickOutsideAction = null
  },
})
