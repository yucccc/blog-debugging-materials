import { map } from '../map'

test('map', () => {
  const array = [1, 2, 3]
  const newArr = map(array, (item) => {
    return item * 2
  })
  expect(newArr).toStrictEqual([2, 4, 6])
})