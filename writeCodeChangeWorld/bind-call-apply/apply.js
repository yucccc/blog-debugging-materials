Function.prototype.myApply = function(thisArg, args) {
  const fn = Symbol('fn')
  // 上下文
  const context = thisArg || window
  context[fn] = this
  const res = context[fn](...args)
  delete context[fn]
  return res
}