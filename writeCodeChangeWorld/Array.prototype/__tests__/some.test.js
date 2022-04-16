import { some } from '../some'

test('some', () => {
  const array = [1, 2, 3]
  const newArr = some(array, (item) => {
    return item > 1
  })
  expect(newArr).toBe(true)
})