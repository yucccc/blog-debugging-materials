// every() 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。

export const every = function(array, callback, thisArg) {
  let flag = true
  for (let index = 0; index < array.length; index++) {
    flag = callback.call(thisArg, array[index], index, array)
    if (!flag)
      break
  }
  return flag
}