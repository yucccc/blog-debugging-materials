export const reduce = function(array, cb, initV) {
  let res = initV
  for (const current of array) {
    res = cb(res, current)
  }
  return res
}