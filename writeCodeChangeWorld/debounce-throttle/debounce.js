/**
 * 在时间内触发多次只执行最后一次
 * @param {*} fn
 * @param {*} wait
 * @returns
 */
export function debounce(fn, wait = 200) {
  let timer = null
  return function(...arg) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, arg)
    }, wait)
  }
}