import { every } from '../every'

test('every', () => {
  const array = [1, 2, 3]
  const newArr = every(array, (item) => {
    return item > 0
  })
  expect(newArr).toBe(true)
})

test('every2', () => {
  const array = [1, 2, 3]
  const newArr = every(array, (item) => {
    return item > 1
  })
  expect(newArr).toBe(false)
})