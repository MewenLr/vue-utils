export function date(lang, separator) {
  const today = new Date()

  let dd = today.getDate()
  let mm = today.getMonth() + 1
  const yyyy = today.getFullYear()

  if (dd < 10) dd = `0${dd}`
  if (mm < 10) mm = `0${mm}`

  if (lang === 'en') return `${mm}${separator}${dd}${separator}${yyyy}`

  if (lang === 'fr') return `${dd}${separator}${mm}${separator}${yyyy}`

  return new Error('Invalid language format')
}

export function hour() {
  const today = new Date()

  let h = today.getHours()
  let min = today.getMinutes()
  let sec = today.getSeconds()

  if (h < 10) h = `0${h}`
  if (min < 10) min = `0${min}`
  if (sec < 10) sec = `0${sec}`

  return `${h}:${min}:${sec}`
}
