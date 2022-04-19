import MyPromise, { FULFILLED, PENDING, REJECTED } from '../my-promise-2'

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