//variable to store user's anime search
let anime

// axios.get('/api/anime')
// .then(({data}) => {
//   document.getElementById('name').textContent = data[0].name
//   document.getElementById('mal').textContent = data[0].mal
//   let results = document.getElementById('results')
//   console.log(data)
//   for(let i = 1; i< data.length; i++){
//     let listItem = document.createElement('li')
//     listItem.innerHTML = `
//     number: ${data[i].number}<br>
//     title: ${data[i].title}<br>
//     link: <span><a href="${data[i].link}" target="_blank" rel="noopener noreferrer">Link</a></span><br>
//     episode(s): ${data[i].episode || 'N/A'}
//     `
//     results.append(listItem)
//   }
// })
// .catch(err => console.err(err))

document.getElementById('submit').addEventListener('click', event => {
  //prevent default of a button in a a form
  event.preventDefault()
  //run api call to get titles
  axios.get(`https://api.jikan.moe/v3/search/anime?q=${document.getElementById('search').value}&limit=30`)
  .then( ({data : {results}}) => {
    //jikan returns the anime titles in the results key
    console.log(results)
    for(let i = 0; i < results.length; i++){
      //need 2 titles for the way animeThemes sets its starting year (can specify a year: 1999 or say 90s)
      //only create cards for anime that have already aired
      if(results[i].start_date !== null){
        let animeNode = document.createElement('div')
        //get title
        animeNode.dataset.title = results[i].title
        //get the start year
        animeNode.dataset.year = results[i].start_date.substring(0, 4)
        animeNode.setAttribute('class', 'card col-sm-6 col-md-4')
        animeNode.innerHTML = `
          <img src="${results[i].image_url}" class="card-img-top" alt="${results[i].title} placeholder">
          <div class="card-body">
            <h5 class="card-title">
              <a href = "${results[i].url}">
                ${results[i].title}
              </a>
            </h5>
            <p class="card-text">${results[i].synopsis}</p>
            <a class="btn btn-primary searchResult">Watch Op/Ed</a>
          </div>
          `
        document.getElementById('results').append(animeNode)
      }
    //empty out user input
    document.getElementById('search').value = ''
  }
  })
  .catch(err => console.error(err))
})