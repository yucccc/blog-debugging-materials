
Function.prototype.myCall = function(thisArg, ...args) {
  const fn = Symbol('fn')
  // 上下文
  const context = thisArg || window
  context[fn] = this
  const _args = Array.from(args).slice()
  const res = context[fn](..._args)
  delete context[fn]
  return res
}