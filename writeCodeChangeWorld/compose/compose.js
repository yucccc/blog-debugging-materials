
export function compose(...args) {
  return (value) => {
    return args.reduce((previousValue, currentValue) => currentValue(previousValue), value)
  }
}

// 在lodash中是flowRight 从右执行
export function composeRight(...args) {
  return (value) => {
    return args.reverse().reduce((previousValue, currentValue) => currentValue(previousValue), value)
  }
}