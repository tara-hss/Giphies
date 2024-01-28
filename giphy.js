// const { query } = require("express")

let scrollCount = 0
let offsetCounter = 0
let form = document.createElement('form')
form.classList.add('form')
let input = document.createElement('input')
input.classList.add('input')
let button = document.createElement('button')
button.classList.add('search-btn')
button.textContent = 'Search'
// let query = document.querySelector('input')

document.querySelector('body').appendChild(form)
form.append(input, button)


function newGiphies(query, limit, offset) {
    offsetCounter = offsetCounter + 10
    axios.get(`http://api.giphy.com/v1/gifs/search?q=${query}&limit=${limit}&offset=${offset}&api_key=bgAus6ZjnKVe8X4WzVi948s302vf64Qg`).then(res => {
        
        let giphies = res.data.data;
        
        giphies.forEach(giphy => {
            let article = document.createElement('article')
            article.classList.add('image-container')
            let img = document.createElement('img')
            img.classList.add('img')
            img.src = giphy.images.original.url
            
            document.querySelector('body').appendChild(article)
            article.appendChild(img)
            // input.value = query
          
        })
        if(scrollCount == 4) {
            let loadMoreBtn = document.createElement('button')
            loadMoreBtn.classList.add('loadMore-btn')
            loadMoreBtn.textContent = 'Load More'
            document.querySelector('body').appendChild(loadMoreBtn)
            loadMoreBtn.addEventListener('click', () => {
                newGiphies(query, 10, offsetCounter)
            })
        }
    })
}

button.addEventListener('click', function(event) {
    event.preventDefault()
    
    let query = document.querySelector('input').value
    
    newGiphies(query, 10, offsetCounter);
})

window.addEventListener('scroll', function scroll(x) {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight
    const scrolled = window.scrollY

    if(Math.ceil(scrolled) === scrollable && scrollCount < 4) {
        let query = document.querySelector('input').value
        scrollCount++
        newGiphies(query, 10, offsetCounter)
    }    
})

