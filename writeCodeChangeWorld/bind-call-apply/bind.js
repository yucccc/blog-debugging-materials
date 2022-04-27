// 不支持new功能

export const bind1 = function(fn, that, ...args) {
  return (...args2) => {
    // 预制的参数优先级最高 无法被后续的覆盖
    return fn.apply(that, args.concat(args2))
  }
}

// 支持new
Function.prototype.bind1 = function(oThis) {
  if (typeof this !== 'function') {
    // 与 ECMAScript 5 最接近的 // 内部 IsCallable 函数
    throw new TypeError('bound is not callable')
  }
  const aArgs = Array.prototype.slice.call(arguments, 1)
  const fToBind = this
  const fNOP = function() {}
  const fBound = function() {
    return fToBind.apply((this instanceof fNOP && oThis ? this : oThis),
      aArgs.concat(Array.prototype.slice.call(arguments)))
  }
  fNOP.prototype = this.prototype
  fBound.prototype = new fNOP()
  return fBound
}