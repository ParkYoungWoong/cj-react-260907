const data = {
  pages: [
    { Search: [1, 2, 3] }, // page1
    { Search: [1, 2, 3] }, // page2
    { Search: [1, 2, 3] }, // page3
    { Search: [1, 2, 3] }, // page4
    { Search: [1, 2, 3] } // page5
  ]
}
// const selectedData = [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3]
const selectedData = data.pages.flatMap(page => page.Search)

data.pages.map(page => {
  return page.Search.map(movie => {
    return <li></li>
  })
})

selectedData.map(movie => {
  return <li></li>
})

const numbers = [1, 2, 3]
console.log(numbers.some(num => num < 2)) // ??
