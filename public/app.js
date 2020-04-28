axios.get('/api/anime')
.then(({data}) => {
  document.getElementById('name').textContent = data[0].name
  document.getElementById('mal').textContent = data[0].mal
  let results = document.getElementById('results')
  console.log(data)
  for(let i = 1; i< data.length; i++){
    let listItem = document.createElement('li')
    listItem.innerHTML = `
    number: ${data[i].number}<br>
    title: ${data[i].title}<br>
    link: <span><a href="${data[i].link}" target="_blank" rel="noopener noreferrer">Link</a></span><br>
    episode(s): ${data[i].episode || 'N/A'}
    `
    results.append(listItem)
  }
})
.catch(err => console.err(err))

document.getElementById('submit').addEventListener('click', event => {
  //prevent default of a button in a a form
  event.preventDefault()
  let animeTitles = []
  //run api call to get titles
  axios.get(`https://api.jikan.moe/v3/search/anime?q=${document.getElementById('search').value}&limit=30`)
  .then( ({data: titles}) => {
    //jikan returns the anime titles in the results key
    console.log(titles.results)
    //empty out user input
    document.getElementById('search').value = ''
  })
  .catch(err => console.error(err))
})