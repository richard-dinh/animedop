import React, { useState, useContext, useEffect } from 'react'
import API from '../utils/api/api.js'
import { makeStyles } from '@material-ui/core/styles'
import AnimeContext from '../utils/context/AnimeContext.js'
import VideoPlayer from './VideoPlayer'
import loadingGif from './../assets/raphtalia-spin.gif'
import { Grid, Paper, Typography, Container } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    boxSizing: 'border-box'
  },
  sideVideo: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    maxHeight: '20%',
    marginTop: '5px',
  },
  videoPlayer: {
    paddingRight: '5px',
  },
  sideBar: {
    paddingRight: '10px', 
    paddingLeft: '5px'
  }
}))

const VideoList = () => {
  const classes = useStyles()
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
          elevation = {3}
          className = {classes.sideVideo}
          onClick={() => {
            setSelectedVideo(animeVideo)
          }}
        >
          <Grid container>
            <Grid item xs={4}>
              <img
                src='https://i.imgur.com/I2jULg9.png'
                alt='thumbnail'
              />
            </Grid>
            <Grid item xs={8}>
              <Typography component="h5" variant="h5">
                {animeVideo.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {animeVideo.number}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      ) : null
    )
    return (
      <div className = {classes.root}>
        <Grid container container>
          <Grid item xs = {12} sm = {9} className = {classes.videoPlayer}>
            {/* Video that is playing */}
            <VideoPlayer videoSrc={selectedVideo.link}></VideoPlayer>
          </Grid> 
          <Grid item xs={12} sm={3} className = {classes.sideBar}>
            {/* Video Selection sidebar */}
              {listAnimeVideos}
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default VideoList
