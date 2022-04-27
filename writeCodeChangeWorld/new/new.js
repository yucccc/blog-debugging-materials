export const n = function(fn, ...args) {
  // 不使用...的话 可以使用
  // args = Array.prototype.slice.call(arguments, 1)
  // 1. 创建一个新的空对象 并将构造函数的prototype指向这个对象
  const o = Object.create(fn.prototype)
  // 绑定this
  const res = fn.apply(o, args)
  // 返回 如果是对象 那么返回 否则返回这个刚刚创建的对象
  return res instanceof Object ? res : o
}