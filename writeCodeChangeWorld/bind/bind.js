// 不支持new功能

Function.prototype.mybind1 = function(that, ...args) {
  const fn = this // 调用的函数
  return function bind(...args2) {
    // 预制的参数优先级最高 无法被后续的覆盖
    return fn.apply(that, args.concat(args2))
  }
}

// 支持new

Function.prototype.mybind2 = function(that, ...args) {
  const fn = this // 调用的函数
  const bind = function(...args2) {
    // 预制的参数优先级最高 无法被后续的覆盖
    return fn.apply(that, args.concat(args2))
  }
  bind.prototype = Object.create(fn.prototype)
  bind.prototype.custructor = fn
  return bind
}
