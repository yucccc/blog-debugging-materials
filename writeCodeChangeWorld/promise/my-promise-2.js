// 1 实现 then 方法 得到返回结果

export const PENDING = 'pending'
export const FULFILLED = 'fulfilled'
export const REJECTED = 'rejected'

class MyPromise {
  // 当前状态
  status = PENDING
  // 成功返回值
  value = undefined
  // 失败返回原因
  reason = undefined
  constructor(executor) {
    // 执行一下传递进来的函数 传入resolve reject
    executor(this.resolve, this.reject)
  }

  resolve = (value) => {
    if (this.status !== PENDING) return
    this.status = FULFILLED
    this.value = value
  }

  reject = (reason) => {
    if (this.status !== PENDING) return
    this.status = REJECTED
    this.reason = reason
  }

  // 给回调函数加上默认参数 解决后续传递空then 以及 用户未传递参数问题
  then(successCallback = value => value, failCallback = (reason) => { throw reason }) {
    // 返回一个新的Promise
    const mp2 = new MyPromise((resolve, reject) => {
      // 成功
      if (this.status === FULFILLED) {
        setTimeout(() => {
          const res = successCallback(this.value)
          // 把执行完的值给到下一个
          if (mp2 === res)
            return reject(new TypeError('Chaining cycle detected for promise #<My Promise>'))
          else
            return resolve(res)
        }, 0)
      }
      // 失败执行失败回调
      else if (this.status === REJECTED) {
        const res = failCallback(this.reason)
        reject(res)
      }
    })
    return mp2
  }
}
// function resolvePromise(mp2, value, resolve, reject) {
//   if (mp2 === value)
//     return reject(new TypeError('Chaining cycle detected for promise #<My Promise>'))
//   return resolve(value)
// }

export default MyPromise
