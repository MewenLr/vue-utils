function tagLoaded(el) {
  setTimeout(() => el.classList.add('image--loaded'), 100)
}

export default {
  bind: (el, binding) => {
    function loadImage() {
      const picture = Array.from(el.children).find(
        (element) => element.classList.value.includes('picture'),
      )
      if (picture) {
        picture.addEventListener('load', tagLoaded(el))
        picture.addEventListener('error', () => console.log('error'))
        picture.src = picture.dataset.url
      }
    }

    function handleIntersect(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadImage()
          observer.unobserve(el)
        }
      })
    }

    function createObserver() {
      const options = { root: null, threshold: '0' }
      const observer = new IntersectionObserver(handleIntersect, options)
      observer.observe(el)
    }

    if (window.IntersectionObserver && binding.value) return createObserver()
    return /* ie11 || !lazy */ loadImage()
  },
  unbind: (el) => {
    const picture = Array.from(el.children).find(
      (element) => element.classList.value.includes('picture'),
    )
    if (picture) {
      picture.removeEventListener('load', tagLoaded(el))
      picture.removeEventListener('error', () => console.log('error'))
    }
  },
}
