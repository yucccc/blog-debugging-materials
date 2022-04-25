
// 打平数组
export const flat = function(array, depth = 1) {
  return depth > 0
    ? array.reduce((acc, current) => acc.concat(Array.isArray(current) ? flat(current, depth - 1) : current), [])
    // 拷贝返回
    : array.slice()
}