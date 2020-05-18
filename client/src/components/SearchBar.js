import React, { useState, useContext, useEffect } from 'react'
import { VideoContext } from './../context/VideoContext'
import { Paper, TextField } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { resultsJikanFromTitle } from './../model/Reddit'

function SearchBar() {
  const history = useHistory()

  // Context
  const {
    valueQuery,
    valueVideos,
    valueVideoSelected,
    valueAnimes,
  } = useContext(VideoContext)
  const setAnimes = valueAnimes[1]
  const setVideos = valueVideos[1]
  const setVideoSelected = valueVideoSelected[1]

  // States: search, query
  const [search, setSearch] = useState('')
  const [query, setQuery] = valueQuery

  //
  useEffect(() => {
    const loadVideos = () => {
      console.log('loadVideos -> query', query)

      var animes = []
      // Call Jikan Api to retrieve a list of anime names from search
      resultsJikanFromTitle(query).then((results) => {
        for (var i = 0; i < results.length; i++) {
          // Format data into a model: VideoGrid
          if (results[i].start_date !== null) {
            animes.push({
              title: results[i].title,
              year: results[i].start_date.substring(0, 4),
              img: results[i].image_url,
              mal_id: results[i].mal_id,
              synopsis: results[i].synopsis,
              url: results[i].url,
            })
          }
        }
        setAnimes(animes)
        setSearch('')
      })
    }

    loadVideos()
  }, [query])

  // Events
  const handleChangeSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleSubmitForm = (e) => {
    e.preventDefault()
    // setVideoSelected('')
    // setVideos([])
    setQuery(search)
    history.push('/')
  }

  //
  return (
    <Paper elevation={6} style={{ padding: '25px' }}>
      <form onSubmit={handleSubmitForm}>
        <TextField fullWidth label='Search...' onChange={handleChangeSearch} />
      </form>
    </Paper>
  )
}

export default SearchBar
