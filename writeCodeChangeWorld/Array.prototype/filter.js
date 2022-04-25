export const filter = function(array, callback, thisArg) {
  // 返回的结果
  const result = []
  for (let index = 0; index < array.length; index++) {
    const element = array[index]
    if (callback.call(thisArg, element, index, array)) {
      result.push(element)
    }
  }
  return result
}