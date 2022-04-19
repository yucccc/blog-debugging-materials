import MyPromise1, { FULFILLED, PENDING, REJECTED } from '../my-promise-1'

describe('MyPromise-1', () => {
  it('函数应该被立刻执行', () => {
    let index = 0
    const mp1 = new MyPromise1(() => {
      index++
    })
    expect(index).toBe(1)
    expect(mp1.status).toBe(PENDING)
  })
  it('调用resolve修改状态', () => {
    const mp1 = new MyPromise1((resolve) => {
      resolve(1)
    })
    expect(mp1.status).toBe(FULFILLED)
  })

  it('调用reject修改状态', () => {
    const mp1 = new MyPromise1((_, reject) => {
      reject(1)
    })
    expect(mp1.status).toBe(REJECTED)
  })

  it('多次修改状态 首次修改后不再被修改', () => {
    const mp1 = new MyPromise1((resolve, reject) => {
      resolve('成功')
      reject('失败')
    })
    expect(mp1.status).toBe(FULFILLED)
  })
})