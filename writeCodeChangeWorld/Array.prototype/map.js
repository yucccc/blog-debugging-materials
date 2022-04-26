export const map = function(array, callback, thisArg) {
  const result = []
  for (let index = 0; index < array.length; index++) {
    result.push(callback.call(thisArg, array[index], index, array))
  }
  return result
}