export const PENDING = 'pending'
export const FULFILLED = 'fulfilled'
export const REJECTED = 'rejected'

class MyPromise {
  // 当天状态
  status = PENDING
  // 成功的值
  value = undefined
  // 失败的原因
  reason = undefined
  successCallback = []
  failCallback = []
  constructor(executor) {
    try {
      // 也可以使用 this.resolve.bind(this)
      executor(this.resolve, this.reject)
    }
    catch (error) {
      this.reject(error)
    }
  }

  // 用箭头函数 绑定上下文this
  resolve = (value) => {
    if (this.status !== PENDING) { return }
    this.status = FULFILLED
    this.value = value
    while (this.successCallback.length) { this.successCallback.shift()() }
  }

  reject = (reason) => {
    if (this.status !== PENDING) { return }

    this.status = REJECTED
    this.reason = reason

    while (this.failCallback.length) {
      this.failCallback.shift()()
    }
  }

  then(successCallback = value => value, failCallback = (reason) => { throw reason }) {
    const _mp2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          resolveWrapper(_mp2, successCallback, this.value, resolve, reject)
        }, 0)
      }
      else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            // 拿到返回值
            const res = failCallback(this.reason)
            resolvePromise(_mp2, res, resolve, reject)
          }
          catch (error) {
            reject(error)
          }
        }, 0)
      }
      else {
        // 处理异步情况
        // 将成功或者失败存储起来
        this.successCallback.push(() => {
          setTimeout(() => {
            resolveWrapper(_mp2, successCallback, this.value, resolve, reject)
          }, 0)
        })
        this.failCallback.push(() => {
          setTimeout(() => {
            resolveWrapper(_mp2, failCallback, this.reason, resolve, reject)
          }, 0)
        })
      }
    })
    return _mp2
  }

  finally(callback) {
    // 如何得到状态
    return this.then(callback, callback)
  }

  catch(failCallback) {
    return this.then(undefined, failCallback)
  }

  /**
   * 接收一个数组 返回一组promise 如果其中有一个rejected 那么就返回onRejected的值
   *
   * @param {*} array
   * @returns
   */
  static all(iterable) {
    // 返回一个Promise数组
    const result = []
    let _index = 0
    return new MyPromise((resolve, reject) => {
      const addItem = function(index, value) {
        result[index] = value
        if (++_index === iterable.length) {
          resolve(result)
        }
      }
      for (let index = 0; index < iterable.length; index++) {
        const current = iterable[index]
        if (isPromise(current)) {
          current.then(value => addItem(index, value), (reason) => {
            reject(reason)
          })
        }
        // 普通对象
        else {
          addItem(index, current)
        }
      }
    })
  }

  static resolve(value) {
    if (value instanceof MyPromise) { return value }
    return new MyPromise(resolve => resolve(value))
  }

  /**
   * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/any
   * 只要其中的一个 promise 成功，就返回那个已经成功的 promise
   * 如果全部都失败了 就返回一个失败的 promise 和AggregateError类型的实例，它是 Error 的一个子类，用于把单一的错误集合在一起。
   * 存在的问题 any返回后循环未被终止
   */
  static any(iterable) {
    return new MyPromise((resolve, reject) => {
      let count = 0
      for (let index = 0; index < iterable.length; index++) {
        const current = iterable[index]
        if (isPromise(current)) {
          current.then(resolve, (reason) => {
            if (++count === iterable.length) { return reject(new AggregateError(reason, 'Promises rejected.')) }
          })
        }
        // 需要return终止循环
        else {
          return resolve(current)
        }
      }
    })
  }

  /**
   *
   * @param {*} iterable 接收一个数组 不论成功失败
   */
  static allSettled(iterable) {
    const result = []
    let count = 0
    return new MyPromise((resolve) => {
      const addItem = function() {
        if (++count === iterable.length) { resolve(result) }
      }
      iterable.forEach((current, index) => {
        if (isPromise(current)) {
          current.then((res) => {
            result[index] = { status: FULFILLED, value: res }
            addItem()
          }, (reason) => {
            result[index] = { status: REJECTED, value: reason }
            addItem()
          })
        }
        else {
          addItem()
          result[index] = {
            status: FULFILLED,
            value: current,
          }
        }
      })
    })
  }

  /**
   * 返回最先返回的那个
   * @param {*} iterable
   */
  static race(iterable) {
    return new MyPromise((resolve, reject) => {
      for (const current of iterable) {
        if (isPromise(current)) { current.then(resolve, reject) }
        else { resolve(current) }
      }
    })
  }
}

// 解析promise
function resolvePromise(_mp2, v, resolve, reject) {
  // 自己调用自己
  if (_mp2 === v) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  if (isPromise(v)) {
    v.then(resolve, reject)
  }
  else {
    // 普通值
    resolve(v)
  }
}
// 包装promise
function resolveWrapper(_mp2, fn, fnParams, resolve, reject) {
  try {
    // 拿到返回值
    resolvePromise(_mp2, fn(fnParams), resolve, reject)
  }
  catch (error) {
    reject(error)
  }
}
// 是否Promise的实例
function isPromise(obj) {
  return obj instanceof MyPromise
}

export default MyPromise
