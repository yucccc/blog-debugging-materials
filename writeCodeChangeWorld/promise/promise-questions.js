
console.info('====> 1 ') // 1
new Promise((resolve, reject) => {
  console.info('====> 2 ')
  setTimeout(() => {
    resolve('定时器执行')
  }, 0)
})
  .then((value) => {
    console.info('3')
    return new Promise((resolve) => {
      console.info('4')
      resolve(`5 ==>${value}`)
    })
      .then((res) => {
        console.info(`6 ==> ${res}`)
      })
  })
  .then((value) => {
    console.info(`7 ==> ${value}`)
  })
console.info('8')