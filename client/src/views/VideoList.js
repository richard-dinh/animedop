import React, { useState, useContext, useEffect } from 'react'
import API from '../utils/api/api.js'
import AnimeContext from '../utils/context/AnimeContext.js'
import VideoPlayer from './VideoPlayer'
import loadingGif from './../assets/raphtalia-spin.gif'
import { Grid, Paper, Typography } from '@material-ui/core'

const VideoList = () => {
  const {
    wikiPage,
    updateWikiPage,
    mal_id,
    videos,
    updateVideos,
    title,
    selectedVideo,
    setSelectedVideo,
    updateSearch,
  } = useContext(AnimeContext)

  const [animeVideos, setAnimeVideos] = useState([])
  useEffect(() => {
    //set search to null in event user searches same anime again
    API.getWiki(mal_id, title)
      .then(({ data: { wikiPage, title: englishTitle } }) => {
        //if english title is returned due to title not being found in reddit wiki, run getVideos with english title (title returned from call)
        API.getVideos(englishTitle ? englishTitle : title, wikiPage)
          .then(({ data }) => {
            setAnimeVideos(data)
            const firstValidLink = data.find((animeVideo) =>
              animeVideo.hasOwnProperty('link')
            )
            // No longer picks the best ed, sad raphtalia noises
            setSelectedVideo(firstValidLink)
          })
          .catch((err) => console.error(err))
      })
      .catch((err) => console.error(err))
  }, [])

  if (!selectedVideo) {
    return (
      <div>
        <img src={loadingGif} alt='loading...' />
      </div>
    )
  } else {
    const listAnimeVideos = animeVideos.map((animeVideo) =>
      animeVideo.link ? (
        <Paper
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={() => {
            setSelectedVideo(animeVideo)
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={7}>
              <img
                src='https://i.imgur.com/I2jULg9.png'
                alt='thumbnail'
                style={{ marginRight: '2px' }}
              />
            </Grid>

            <Grid item xs={4}>
              <Typography variant='subtitle2'>
                <b>{animeVideo.title}</b>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      ) : null
    )
    return (
      <div>
        <VideoPlayer videoSrc={selectedVideo.link}></VideoPlayer>
        <Grid item xs={12}>
          {listAnimeVideos}
        </Grid>
      </div>
    )
  }
}

export default VideoList
