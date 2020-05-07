import React, { useState, useContext, useEffect } from 'react'
import { VideoContext } from './../context/VideoContext'
import youtube from './../api/youtube'

// Paper = Raised Div
import { Paper, TextField } from '@material-ui/core'
function SearchBar() {
  const { valueQuery, valueVideos, valueVideoSelected } = useContext(
    VideoContext
  )
  const setVideos = valueVideos[1]
  const setVideoSelected = valueVideoSelected[1]
  const [search, setSearch] = useState('')
  const [query, setQuery] = valueQuery

  useEffect(() => {
    const loadVideos = async () => {
      const response = await youtube.get('search', {
        params: {
          part: 'snippet',
          maxResults: 5,
          key: 'OMITTED API KEY',
          type: 'video',
          q: query,
        },
      })

      setSearch('')

      const videosData = response.data.items
      setVideos(videosData)
      setVideoSelected(videosData[0])
      console.log(response.data.items)
    }

    loadVideos()
  }, [query])

  const handleChange = (e) => {
    console.log(e.target.value)
    setSearch(e.target.value)
  }

  const handleSubmit = (e) => {
    setQuery(search)
    e.preventDefault()
    console.log(search)
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
