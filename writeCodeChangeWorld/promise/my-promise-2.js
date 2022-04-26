const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

export class MyPromise {
  status = PENDING
  value = undefined // 成功
  reason = undefined //  失败原因
  successCallback = [] // 异步成功回调
  failCallback = [] // 异步失败回调
  constructor(fn) {
    try {
      fn(this.resolve, this.reject)
    }
    catch (error) {
      this.reject(error)
    }
  }

  resolve = (value) => {
    if (this.status !== PENDING) { return }
    this.status = FULFILLED
    this.value = value
    while (this.successCallback.length) {
      this.successCallback.shift()(value)
    }
  }

  reject = (reason) => {
    if (this.status !== PENDING) { return }
    this.status = REJECTED
    this.reason = reason
    while (this.failCallback.length) {
      this.failCallback.shift()(reason)
    }
  }

  then(
    successCallback = value => value,
    failCallback = (reason) => { throw reason },
  ) {
    const mp2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            const res = successCallback(this.value)
            if (res === mp2) {
              return new TypeError('Chaining cycle detected for promise #<Promise>')
            }
            if (isPromise(res)) {
              res.then(resolve, reject)
            }
            else {
              resolve(res)
            }
          }
          catch (error) {
            reject(error)
          }
        })
      }
      else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            const res = failCallback(this.reason)
            if (isPromise(res)) {
              res.then(resolve, reject)
            }
            else {
              reject(res)
            }
          }
          catch (error) {
            reject(error)
          }
        })
      }
      else {
        this.successCallback.push(() => {
          setTimeout(() => {
            const res = successCallback(this.value)
            if (isPromise(res)) {
              res.then(resolve, reject)
            }
            else {
              resolve(res)
            }
          })
        })
        this.failCallback.push(() => {
          setTimeout(() => {
            const res = failCallback(this.reason)
            if (isPromise(res)) {
              res.then(resolve, reject)
            }
            else {
              reject(res)
            }
          })
        })
      }
    })
    return mp2
  }

  catch(failCallback) {
    return this.then(undefined, failCallback)
  }

  finally(callback) {
    return this.then(callback, callback)
  }
}
function isPromise(v) {
  return v instanceof MyPromise
}

export default MyPromise