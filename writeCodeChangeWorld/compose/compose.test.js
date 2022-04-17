import { compose, composeRight } from './compose'

const first = array => array[0]
const toUpperCase = str => str.toUpperCase()
const done = str => `${str} done!`

test('composeRight', () => {
  const com = composeRight(done, toUpperCase, first)
  const v = com(['aaa', 'bbb', 'cccc'])
  expect(v).toBe('AAA done!')
})

test('composeRight2', () => {
  const com = composeRight(done, toUpperCase, first)
  const v = com(['v', 'bbb', 'cccc'])
  expect(v).toBe('V done!')
})

test('compose', () => {
  const com = compose(first, toUpperCase, done)
  const v = com(['v', 'bbb', 'cccc'])
  expect(v).toBe('V done!')
})