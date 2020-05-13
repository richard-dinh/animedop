import React, { useState, useContext, useEffect } from 'react'
import { VideoContext } from './../context/VideoContext'
import { resultsJikanFromTitle, songsByAnimeTitleYear } from './../model/Reddit'
// Paper = Raised Div
import { Paper, TextField } from '@material-ui/core'
import { Redirect, useHistory } from 'react-router-dom'
function SearchBar() {
  const history = useHistory()

  const {
    valueQuery,
    valueVideos,
    valueVideoSelected,
    valueAnimes,
  } = useContext(VideoContext)
  const [animes, setAnimes] = valueAnimes
  const setVideos = valueVideos[1]
  const setVideoSelected = valueVideoSelected[1]
  const [search, setSearch] = useState('')
  const [query, setQuery] = valueQuery

  useEffect(() => {
    const loadVideos = () => {
      // const response = await youtube.get('search', {
      //   params: {
      //     part: 'snippet',
      //     maxResults: 5,
      //     key: 'AIzaSyBzNKqLgfTDryS18-krKCqr_-tdeHfityY',
      //     type: 'video',
      //     q: query,
      //   },
      // })
      var animes = []
      const response = resultsJikanFromTitle(query).then((results) => {
        for (var i = 0; i < results.length; i++) {
          if (results[i].start_date !== null) {
            animes.push({
              title: results[i].title,
              year: results[i].start_date.substring(0, 4),
              img: results[i].image_url,
              mal_id: results[i].mal_id,
              synopsis: results[i].synopsis,
              url: results[i].url,
            })
            // let animeNode = document.createElement('div')
            // //save title
            // animeNode.dataset.title = results[i].title
            // //save the start year
            // animeNode.dataset.year = results[i].start_date.substring(0, 4)
            // //save image
            // animeNode.dataset.img = results[i].image_url
            // //save mal_id
            // animeNode.dataset.mal_id = results[i].mal_id
            // animeNode.setAttribute('class', 'card col-sm-6 col-md-4 cardStyle')
            // animeNode.innerHTML = `
            // <img src="${results[i].image_url}" class="card-img-top" alt="${results[i].title} placeholder">
            // <div class="card-body">
            //   <h5 class="card-title">
            //     <a href = "${results[i].url}">
            //       ${results[i].title}
            //     </a>
            //   </h5>
            //   <p class="card-text">${results[i].synopsis}</p>
            //   <a class="btn btn-primary searchResult">Watch Op/Ed</a>
            // </div>
            // `
            // document.getElementById('results').append(animeNode)
          }
        }
        setAnimes(animes)

        // console.log(results[0])
        // const data = results[0]
        // const link = songsByAnimeTitleYear(
        //   data.title,
        //   data.mal_id,
        //   data.start_date.substring(0, 4),
        //   data.img
        // ).then((result) => {
        //   console.log('res-' + JSON.stringify(result))
        //   //setVideoSelected(result[5].link)

        //   var videosData = []
        //   for (var j = 0; j < result.length; j++) {
        //     if (result[j].link != undefined) {
        //       videosData.push({
        //         key: j,
        //         type: result[j].number,
        //         link: result[j].link,
        //         title: result[j].title,
        //         episode: result[j].episode,
        //       })
        //     }
        //   }
        setSearch('')

        //   // const videosData = response.data.items
        //   setVideos(videosData)
        //   setVideoSelected(videosData[0].link)
        //   // console.log(response.data.items)
        // })
      })
    }

    loadVideos()
  }, [query])

  const handleChange = (e) => {
    console.log(e.target.value)
    setSearch(e.target.value)
  }

  const handleSubmit = (e) => {
    setVideoSelected('')
    setVideos([])
    setQuery(search)
    e.preventDefault()
    console.log(search)
    history.push('/')
  }

  return (
    <Paper elevation={6} style={{ padding: '25px' }}>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label='Search...' onChange={handleChange} />
      </form>
    </Paper>
  )
}

export default SearchBar
