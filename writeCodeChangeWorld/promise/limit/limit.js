
export function pLimit(limit, array) {
  const res = []
  const arr = array.slice()
  let activeCount = 0
  let resCount = 0
  return new Promise((resolve) => {
    function run() {
      while (activeCount < limit && arr.length > 0) {
        activeCount++
        (
          (i) => {
            const v = arr.shift()
            v.then((res) => {
              res[i] = res
            }).catch((err) => {
              throw new Error(err)
            }).finally(() => {
              activeCount--
              if (++resCount === array.length) {
                resolve(res)
              }
              else {
                run()
              }
            })
          }
        )(activeCount++)
      }
    }
    run()
  })
}
