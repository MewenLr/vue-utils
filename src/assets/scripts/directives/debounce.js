/* eslint-disable func-names */
function debounce(fn, delay) {
  let timeout = null

  const debounced = function (...args) {
    const later = () => {
      timeout = null
      fn.apply(this, args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, delay)

    if (!timeout) return fn.apply(this, args)
    return false
  }

  return debounced
}

export default {
  bind(el, binding) {
    const func = binding.value
    const modifier = Object.keys(binding.modifiers)[0]
    el.eventType = ['input', 'keyup'].includes(modifier) ? modifier : 'input'

    if (typeof func !== 'function') {
      console.error(`[v-debounce] provided expression '${binding.expression}' is not a function`)
      return false
    }

    const delay = parseInt(binding.arg, 10) || 300

    el.eventFn = debounce((e) => func(e), delay)

    return el.addEventListener(el.eventType, el.eventFn)
  },
  unbind: (el) => el.removeEventListener(el.eventType, el.eventFn),
}
