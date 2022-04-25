import { myInstanceof } from './instanceof'

test('myInstanceof', () => {
  const fn = () => {}
  const obj = {}
  const eObj = Object.create(null)
  expect(myInstanceof(obj, Object)).toBe(true)
  expect(myInstanceof(obj, Function)).toBe(false)

  expect(myInstanceof(fn, Object)).toBe(true)
  expect(myInstanceof(fn, Function)).toBe(true)

  expect(myInstanceof(eObj, Function)).toBe(false)
  expect(myInstanceof(eObj, Object)).toBe(false)
})