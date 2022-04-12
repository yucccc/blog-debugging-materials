import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

const articleList = [
  {
    name: '根据父id递归成树状',
    url: 'https://www.jianshu.com/p/622b9b2ca2d3',
  },
]
function render(list) {
  return `<ul>
    ${list.map(item => `<li><a href="${item.url}">${item.name}</a> </li>`).join('\n')}
</ul>`
}

app.innerHTML = render(articleList)
