// 基础使用

console.info('基础使用start')

const promise1 = new Promise((resolve, reject) => {
  console.info('promise1')
})

console.info('基础使用end')

// 👆🏻 依次打印 基础使用start  promise1 基础使用end

// ----- then 使用----

const promise2 = new Promise((resolve, reject) => {
  resolve('promise2')
})

// 无聊的我无限then
promise2
  .then()
  .then()
  .then(
    value => console.info(`promise2 成功 ${value}`),
  )
// 👆🏻 打印 promise2 成功 promise2

const pp2 = promise2.then(() => {
  // 返回了自身
  return pp2
}).then((res) => {
  console.log(res, '===')
}).then((res) => {
  console.log(res, '===')
})

const promise3 = new Promise((resolve, reject) => {
  reject(new Error('something bad happened'))
})

promise3.then(
  value => console.info(`promise3 成功 ${value}`),
  reason => console.info(`promise3 失败 ${reason}`), // 打印 promise3 失败 Error: something bad happened
)
