import { forEach } from '../forEach'

test('forEach ', () => {
  let _index = 0
  const array = [1, 2, 3]
  forEach(array, (item, index, _array) => {
    expect(index).toBe(_index)
    expect(_array).toBe(array)
    expect(item).toBe(array[index])
    _index++
  })
})