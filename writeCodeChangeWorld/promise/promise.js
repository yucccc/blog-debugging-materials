const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  status = PENDING
  value = undefined
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
    if (this.status !== PENDING) return
    this.status = FULFILLED
    this.value = value
    // 判断成功的回调是否存在 存在则调用
    // this.successCallback && this.successCallback(value)
    while (this.successCallback.length)
      this.successCallback.shift()()
  }

  reject = (reason) => {
    if (this.status !== PENDING) return

    this.status = REJECTED
    this.reason = reason

    // this.failCallback && this.failCallback(reason)
    while (this.failCallback.length) this.failCallback.shift()()
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

  catch() {
  }

  /**
   * 接收一个数组 返回一组promise 如果其中有一个rejected 那么就返回onRejected的值
   *
   * @param {*} array
   * @returns
   */
  static all(array) {
    // 返回一个Promise数组
    const result = []
    let _index = 0
    return new MyPromise((resolve, reject) => {
      const addItem = function(index, value) {
        result[index] = value
        if (++_index === array.length)
          resolve(result)
      }
      for (let index = 0; index < array.length; index++) {
        const current = array[index]
        if (current instanceof MyPromise) {
          current.then(value => addItem(index, value), (reason) => {
            reject(reason)
          })
        }
        else {
          // 普通对象
          addItem(index, current)
        }
      }
    })
  }
}

// 解析promise
function resolvePromise(_mp2, v, resolve, reject) {
  // 自己调用自己
  if (_mp2 === v)
    return reject(new TypeError('(in promise) TypeError: Chaining cycle detected for promise #<Promise>'))

  if (v instanceof MyPromise) {
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

export default MyPromise
