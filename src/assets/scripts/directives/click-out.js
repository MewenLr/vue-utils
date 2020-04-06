export default {
  bind: (el, binding) => {
    if (typeof binding.value !== 'function') {
      console.warn(`[Vue-click-outside] provided expression '${binding.expression}' is not a function`)
    }
    el.eventFn = (e) => {
      if (!el.contains(e.target) && el !== e.target) binding.value()
    }
    document.addEventListener('click', el.eventFn)
  },
  unbind: (el) => {
    document.removeEventListener('click', el.eventFn)
  },
}
