//variable to store user's anime search
let wikiPage
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

const renderResults = title => {
  //empty out results
  document.getElementById('results').innerHTML = ''
  axios.get(`https://api.jikan.moe/v3/search/anime?q=${title}&limit=30`)
    .then(({ data: { results } }) => {
      //jikan returns the anime titles in the results key
      console.log(results)
      for (let i = 0; i < results.length; i++) {
        //only create cards for anime that have already aired
        if (results[i].start_date !== null) {
          let animeNode = document.createElement('div')
          //get title
          animeNode.dataset.title = results[i].title
          //get the start year
          animeNode.dataset.year = results[i].start_date.substring(0, 4)
          animeNode.dataset.img = results[i].image_url
          animeNode.setAttribute('class', 'card col-sm-6 col-md-4 cardStyle')
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
      }
    })
    .catch(err => console.error(err))
}

//function to generate the list items to hold the op and endings of each anime
const generateList = arr => {
  //create a variable to hold string for li in card body
  let listString =''
  let temp
  for(let i = 1; i< arr.length; i++){
    temp = `
    <li class="list-group-item">
      <button type="button" class="btn btn-primary watch" data-toggle="modal" data-target="#videoModal" data-title = "${arr[i].title}" data-link="${arr[i].link}">
        ${arr[i].number}: ${arr[i].title}
      </button>
    </li>
    `
    listString = listString + temp
  }
  return listString
}

//function to get Op and Endings
const getOpAndEd = (wiki, title, img) => {
  axios.get(`api/anime/${title.toLowerCase()}/${wiki}`)
  .then( ({data}) => {
    //clear out results field
    document.getElementById('results').innerHTML = ''


    let animeNode = document.createElement('div')
    animeNode.setAttribute('class', 'card col-md-12')
    animeNode.innerHTML = `
      <img src="${img}" class="card-img-top imgStyle" alt="${title}">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
      </div>
      <ul class="list-group list-group-flush accordion">
      ${generateList(data)}
      </ul>
    `
    document.getElementById('results').append(animeNode)
  })
  .catch(err => console.error(err))
}

//event listener on all searchResults
document.addEventListener('click', event => {
  let target = event.target
  if(target.id === 'submit') {
    event.preventDefault()
    renderResults(document.getElementById('search').value)
    //empty out user input
    document.getElementById('search').value = ''
  }
  else if(target.classList.contains('searchResult')){
    let parent = target.parentNode.parentNode
    console.log(parent.dataset)
    let year
    //need 2 titles for the way animeThemes sets its starting year (can specify a year: 1999 or say 90s)
    console.log(`/api/animesearch/${parent.dataset.title} (${parent.dataset.year})`)
    axios.get(`/api/animesearch/${parent.dataset.title} (${parent.dataset.year})`)
    .then(({ data: { wikiPage } }) => {
      console.log(wikiPage)
      getOpAndEd(wikiPage, parent.dataset.title, parent.dataset.img)
    })
    .catch(err => {
      //in case there's an error, search for the second way the year is formatted
      console.log(parent.dataset.year)
      if (parseInt(parent.dataset.year) < 2000) {
        //get last two digits and round down to nearest 10
        year = Math.floor(parseInt(parent.dataset.year.substring(2)) / 10) * 10
        // console.log(`${parent.dataset.title} (${year}s)`)
        //run api call here to get wikipage on animeThemes
      }
      console.log(year)
      axios.get(`/api/animesearch/${parent.dataset.title} (${year}s)`)
      .then( ({data : {wikiPage}}) => {
        console.log(wikiPage)
        getOpAndEd(wikiPage, parent.dataset.title, parent.dataset.img)
      })
      .catch( err => {
        console.error('Opening and Endings cannot be found')
      })
    })
  }
  else if (target.classList.contains('watch')){
    console.log(target.dataset)
    //clear out all fields first
    document.getElementById('videoModalLabel').innerHTML =''
    document.getElementById('videoModalBody').innerHTML =''

    document.getElementById('videoModalLabel').innerHTML = target.dataset.title
    document.getElementById('videoModalBody').innerHTML = `
      <video autoplay="autoplay" controls="controls" height="100%" width="100%" preload="auto">
        <source src="${target.dataset.link}"type="video/webm">
        Your browser does not support the video tag.
      </video>
    `
  }
})

//stop video from continuing to play when modal is closed
$("#videoModal").on("hidden.bs.modal", function () {
  document.getElementById('videoModalLabel').innerHTML = ''
  document.getElementById('videoModalBody').innerHTML = ''
});