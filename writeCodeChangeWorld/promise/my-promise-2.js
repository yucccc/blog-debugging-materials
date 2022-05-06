const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

export class MyPromise {
  status = PENDING
  value = undefined // 成功
  reason = undefined //  失败原因
  successCallback = [] // 异步成功回调
  failCallback = [] // 异步失败回调
  constructor(executor) {
    try {
      executor(this.resolve, this.reject)
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
    failCallback = reason => reason,
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

  static resolve(value) {
    if (isPromise(value)) { return value }
    return new MyPromise(resolve => resolve(value))
  }

  static all(iterable) {
    return new MyPromise((resolve, reject) => {
      // 得到的结果数据
      const result = []
      let count = 0
      const addItem = () => {
        if (++count === iterable.length) {
          resolve(result)
        }
      }
      for (let index = 0; index < iterable.length; index++) {
        const currentItem = iterable[index]
        if (isPromise(currentItem)) {
          currentItem.then((res) => {
            result[index] = res
            addItem()
          }).catch((err) => {
            reject(err)
          })
        }
        else {
          result[index] = currentItem
          addItem()
        }
      }
    })
  }

  static allSettled(iterable) {
    return new MyPromise((resolve, reject) => {
      try {
        // 得到的结果数据
        const result = []
        let count = 0
        const addItem = () => {
          if (++count === iterable.length) {
            resolve(result)
          }
        }
        for (let index = 0; index < iterable.length; index++) {
          const currentItem = iterable[index]
          if (isPromise(currentItem)) {
            currentItem.then((res) => {
              result[index] = { status: FULFILLED, value: res }
              addItem()
            }).catch((err) => {
              result[index] = { status: REJECTED, reason: err }
              addItem()
            })
          }
          else {
            result[index] = { status: FULFILLED, value: currentItem }
            addItem()
          }
        }
      }
      catch (error) {
        reject(error)
      }
    })
  }

  static any(iterable) {
    return new MyPromise((resolve, reject) => {
      // 得到的结果数据
      let count = 0
      const addItem = () => {
        if (++count === iterable.length) {
          reject(new AggregateError('All promises were rejected ', 'All promises were rejected '))
        }
      }
      for (let index = 0; index < iterable.length; index++) {
        const currentItem = iterable[index]
        if (isPromise(currentItem)) {
          currentItem.then((res) => {
            resolve(res)
          }).catch(addItem)
        }
        else {
          // 传递的值不是promise
          resolve(currentItem)
          break
        }
      }
    })
  }

  static race(iterable) {
    return new MyPromise((resolve, reject) => {
      for (let index = 0; index < iterable.length; index++) {
        const currentItem = iterable[index]
        if (isPromise(currentItem)) {
          currentItem.then((res) => {
            resolve(res)
          }).catch((err) => {
            reject(err)
          })
        }
        else {
          resolve(currentItem)
          break
        }
      }
    })
  }
}
function isPromise(v) {
  return v instanceof MyPromise
}

export default MyPromise