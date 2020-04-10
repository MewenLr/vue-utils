export default {
  bind: (el, binding) => {
    if (typeof binding.value !== 'function') {
      console.error(`[v-click-outside] provided expression '${binding.expression}' is not a function`)
      return false
    }

    if (Object.keys(binding.modifiers).length) console.warn('[v-debounce] doesn\'t accept modifiers')

    el.eventFn = (e) => {
      if (!el.contains(e.target) && el !== e.target) binding.value()
    }

    return document.addEventListener('click', el.eventFn)
  },
  unbind: (el) => document.removeEventListener('click', el.eventFn),
}
