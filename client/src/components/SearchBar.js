import React, { useState, useContext, useEffect } from 'react'
import { VideoContext } from './../context/VideoContext'
import { resultsJikanFromTitle, songsByAnimeTitleYear } from './../model/Reddit'
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

      const response = resultsJikanFromTitle(query).then((results) => {
        console.log(results[0])
        const data = results[0]
        const link = songsByAnimeTitleYear(
          data.title,
          data.mal_id,
          data.start_date.substring(0, 4),
          data.img
        ).then((result) => {
          console.log('res-' + JSON.stringify(result))
          //setVideoSelected(result[5].link)

          var videosData = []
          var len = result.length
          for (var i = 0; i < len; i++) {
            if (result[i].link != undefined) {
              videosData.push({
                key: i,
                type: result[i].number,
                link: result[i].link,
                title: result[i].title,
                episode: result[i].episode,
              })
            }
          }
          setSearch('')

          // const videosData = response.data.items
          setVideos(videosData)
          setVideoSelected(videosData[0].link)
          // console.log(response.data.items)
        })
      })
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
