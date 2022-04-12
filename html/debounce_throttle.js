
export function debounce(fn, delay = 200) {
  let timer = null
  return function() {
    // 有定时器就清掉 重新开个新的 继续保持延迟
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout((...args) => {
      fn.apply(this, args)
      clearTimeout(timer)
    }, delay)
  }
}

export function throttle(fn, delay = 100) {
  let timer = null
  return function() {
    // 有执行中的任务直接返回
    if (timer) return
    timer = setTimeout((...args) => {
      fn.apply(this, args)
    }, delay)
  }
}
