export const forEach = function(array, callback, thisArg) {
  for (let index = 0; index < array.length; index++)
    callback.call(thisArg, array[index], index, array)
}
