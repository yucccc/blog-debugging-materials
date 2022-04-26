import MyPromise, { FULFILLED, PENDING, REJECTED } from '../my-promise'

describe('MyPromise-1', () => {
  it('函数应该被立刻执行', () => {
    let index = 0
    const mp1 = new MyPromise(() => {
      index++
    })
    expect(index).toBe(1)
    expect(mp1.status).toBe(PENDING)
  })
  it('调用resolve修改状态', () => {
    const mp1 = new MyPromise((resolve) => {
      resolve(1)
    })
    expect(mp1.status).toBe(FULFILLED)
  })

  it('调用reject修改状态', () => {
    const mp1 = new MyPromise((_, reject) => {
      reject(1)
    })
    expect(mp1.status).toBe(REJECTED)
  })

  it('多次修改状态 首次修改后不再被修改', () => {
    const mp1 = new MyPromise((resolve, reject) => {
      resolve('成功')
      reject('失败')
    })
    expect(mp1.status).toBe(FULFILLED)
  })
})

test('MyPromise-2/得到相同的返回值', () => {
  const mp1 = new MyPromise((resolve) => {
    resolve(42)
  })
  mp1.then((value) => {
    expect(value).toBe(42)
  })
  mp1.then((value) => {
    expect(value).toBe(42)
  })
})

test('MyPromise-2/传递空then', () => {
  const mp1 = new MyPromise((resolve) => {
    resolve(42)
  })
  mp1
    .then((value) => {
      expect(value).toBe(42)
      return 43
    })
    .then()
    .then()
    .then((value) => {
      expect(value).toBe(43)
    })
})

test('MyPromise-2/返回自身报错', () => {
  const promise3 = new MyPromise((resolve) => {
    resolve('promise2')
  })

  const pp2 = promise3.then(() => {
    return pp2
  }, (err) => {
    console.info(err)
  })
})