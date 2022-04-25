export function myInstanceof(left, right) {
  const getProto = Object.getPrototypeOf

  let leftValue = getProto(left)
  const rightPrototype = right.prototype

  while (true) {
    if (leftValue === null) { return false }
    if (leftValue === rightPrototype) { return true }
    leftValue = getProto(leftValue)
  }
}