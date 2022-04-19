// 1 实现基础new promise以及改变状态功能

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
}

export default MyPromise
