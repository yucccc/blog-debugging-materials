import { filter } from '../filter'

test('filter ', () => {
  const array = [{ a: 1 }, { a: 2 }, { a: 3 }]
  const result = filter(array, (current) => {
    return current.a > 1
  })
  expect(result).toStrictEqual([{ a: 2 }, { a: 3 }])
})