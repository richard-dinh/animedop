import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { VideoContext } from './../context/VideoContext'
import ReactPlayer from 'react-player'
import { Paper, Typography, Grid } from '@material-ui/core'
import {
  getWikiPageTitle_ByAnimeTitleYear,
  getOpAndEd,
} from './../model/Reddit'
import loadingGif from './../assets/raphtalia-spin.gif'

const VideoDetail = ({ animeId }) => {
  console.log('VideoDetail -> animeId', animeId)
  //
  const history = useHistory()
  // Context
  const { valueVideos, valueVideoSelected, valueAnimes } = useContext(
    VideoContext
  )
  const animes = valueAnimes[0]
  const setVideos = valueVideos[1]
  const [videoSelected, setVideoSelected] = valueVideoSelected

  // Style
  const styleLoadingGif = {
    textAlign: 'center',
  }

  console.log('Video: ')
  // Fix here
  useEffect(() => {
    const getSelectedAnime = () => {
      let searchBy_mal_id = animes.find(
        (anime) => anime.mal_id.toString().trim() === animeId
      )

      if (searchBy_mal_id) {
        localStorage.setItem('selectedAnime', JSON.stringify(searchBy_mal_id))
      }

      const selectedAnime =
        JSON.parse(localStorage.getItem('selectedAnime')) ?? searchBy_mal_id

      return selectedAnime
    }

    const selectedAnime = getSelectedAnime()
    console.log('VideoDetail -> selectedAnime', selectedAnime)
    if (selectedAnime) {
      setVideoSelected('')
      setVideos([])
      getWikiPageTitle_ByAnimeTitleYear(
        selectedAnime.title,
        selectedAnime.mal_id,
        selectedAnime.year,
        selectedAnime.img
      ).then(async ({ wikiPage, title }) => {
        // Get all songs for a single anime
        await getOpAndEd(
          wikiPage,
          title ?? selectedAnime.title,
          selectedAnime.img
        )
          // Format data into a model: VideoList
          .then((result) => {
            var videosData = []
            for (var j = 0; j < result.length; j++) {
              if (result[j].link !== undefined) {
                videosData.push({
                  key: j,
                  type: result[j].number,
                  link: result[j].link,
                  title: result[j].title,
                  episode: result[j].episode,
                })
              }
            }
            // VideoList
            setVideos(videosData)
            // VideoDetail(React Player)
            setVideoSelected(videosData[0].link)
          })
          .catch((e) => {
            console.err(e)
          })
      })
      //}
    } else {
      // setVideos([])
      // setVideoSelected('')
      history.push('/')
    }
  }, [])

  // Loading gif til videos are found
  if (!videoSelected) {
    return (
      <Grid container spacing={4} direction='column' justify='center'>
        <Grid item xs={12}>
          <div style={styleLoadingGif}>
            <img src={loadingGif} alt='loading...' />
            <Typography variant='h4'>
              {'I am your sword! Where you go, I will go with you.'}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    )
  } else {
    // Video player
    const videoSrc = `${videoSelected}`
    return (
      <React.Fragment>
        <Paper elevation={6} style={{ height: '90%' }}>
          <ReactPlayer
            url={videoSrc}
            playing
            controls
            width='100%'
            height='100%'
            volume={0.6}
          />
        </Paper>
      </React.Fragment>
    )
  }
}

export default VideoDetail
