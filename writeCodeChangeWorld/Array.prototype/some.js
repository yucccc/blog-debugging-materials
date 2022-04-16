// some() 方法测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值。

export const some = function(array, callback, thisArg) {
  let flag = false
  for (let index = 0; index < array.length; index++) {
    flag = callback.call(thisArg, array[index], index, array)
    if (flag)
      break
  }

  return flag
}