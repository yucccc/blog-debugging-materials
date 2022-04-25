import { flat } from '../flat'

test('flat', () => {
  const arr1 = [0, 1, 2, [3, 4]]

  const arr2 = [0, 1, 2, [[[3, 4]]]]

  expect(flat(arr1)).toEqual([0, 1, 2, 3, 4])
  expect(flat(arr2, 2)).toEqual([0, 1, 2, [3, 4]])
  expect(flat(arr2, Infinity)).toEqual([0, 1, 2, 3, 4])
})