
export function throttle(fn, wait = 200) {
  let timer = null
  return function(...args) {
    if (timer) { return }
    timer = setTimeout(() => {
      clearTimeout(timer)
      fn.apply(this, args)
    }, wait)
  }
}