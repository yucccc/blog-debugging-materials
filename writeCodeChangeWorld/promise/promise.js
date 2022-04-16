const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
class MyPromise {
  state = PENDING
  result = undefined
  reason = undefined
  successCallback = []
  failCallback = []
  constructor(executor) {
    // 也可以使用 this.resolve.bind(this)
    executor(this.resolve, this.reject)
  }

  // 用箭头函数 绑定上下文this
  resolve = (result) => {
    if (this.state !== PENDING) return
    this.state = FULFILLED
    this.result = result
    // 判断成功的回调是否存在 存在则调用

    // this.successCallback && this.successCallback(result)
    while (this.successCallback.length) this.successCallback.shift()(result)

    return this
  }

  reject = (reason) => {
    if (this.state !== PENDING) return
    this.state = REJECTED
    this.reason = reason
    // this.failCallback && this.failCallback(reason)
    while (this.failCallback.length) this.failCallback.shift()(reason)
    return this
  }

  then(successCallback, failCallback) {
    if (this.state === FULFILLED) {
      this.result = successCallback(this.result)
    }
    else if (this.state === REJECTED) {
      this.reason = failCallback(this.reason)
    }
    else {
      // 处理异步情况
      // 将成功或者失败存储起来
      successCallback && this.successCallback.push(successCallback)
      failCallback && this.failCallback.push(failCallback)
    }
    return this
  }

  catch() {
    return this
  }
}

export default MyPromise
