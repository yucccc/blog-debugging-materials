const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
class MyPromise {
  state = PENDING
  result = undefined
  reason = undefined
  constructor(executor) {
    // 也可以使用 this.resolve.bind(this)
    executor(this.resolve, this.reject)
  }

  // 用箭头函数 绑定上下文this
  resolve = (result) => {
    if (this.state !== PENDING) return
    this.state = FULFILLED
    this.result = result
    return this
  }

  reject = (reason) => {
    if (this.state !== PENDING) return
    this.state = REJECTED
    this.reason = reason
    return this
  }

  then(successFn, FailFn) {
    if (this.state === FULFILLED)
      this.result = successFn(this.result)
    else if (this.state === REJECTED)
      this.reason = FailFn(this.reason)

    return this
  }

  catch() {
    return this
  }
}

export default MyPromise
