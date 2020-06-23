import React, { useState, useContext, useEffect } from 'react'
import API from '../utils/api/api.js'
import { makeStyles } from '@material-ui/core/styles'
import AnimeContext from '../utils/context/AnimeContext.js'
import VideoPlayer from './VideoPlayer'
import loadingGif from './../assets/raphtalia-spin.gif'
import { Grid, Paper, Typography, Container, IconButton } from '@material-ui/core'
import {SkipPrevious, SkipNext} from '@material-ui/icons'
import KeyboardEventHandler from 'react-keyboard-event-handler'
const useStyles = makeStyles((theme) => ({
  root: {
    boxSizing: 'border-box',
  },
  sideVideo: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    maxHeight: '19%',
  },
  sideVideoMargin: {
    marginTop: '.5rem'
  },
  videoPlayer: {
    paddingRight: '1rem',
    paddingLeft: '4rem',
    paddingTop: '1rem',
    maxHeight: '90vh',
    //adjust padding on left and right for anything lower than lg 
    [theme.breakpoints.down('lg')]:{
      paddingLeft: '2rem',
      paddingTop: '2rem'
    }
  },
  sideBar: {
    paddingTop: '1rem',
    paddingRight: '4rem', 
    paddingLeft: '.75rem',
    overflow: 'auto',
    maxHeight: '90vh',
    [theme.breakpoints.down('lg')]: {
      paddingLeft: '2rem',
      paddingTop: '2rem'
    }
  },
  sideVideoDetail: {
    paddingLeft: '3rem'
  },
  videoDetail: {
    paddingTop: '1em'
  },
  fillHeight: {
    height: '100%'
  },
  video: {
    height: '80vh',
    width: 'auto',
    [theme.breakpoints.down('xs')]: {
      height: '36vh'
    }
  },
  buttonGroup: {
    display: 'flex'
  },
  buttonControls: {
    margin: '0 auto'
  }
}))

const VideoList = () => {
  const classes = useStyles()
  const {
    mal_id,
    title,
    selectedVideo,
    setSelectedVideo,
  } = useContext(AnimeContext)

  const [animeVideos, setAnimeVideos] = useState([])
  const [videoIndex, setVideoIndex] = useState({
    index: 0,
    maxLength: 0
  })

  const updateVideoIndex = (index, maxLength) => {
    setVideoIndex({ ...videoIndex, index, maxLength})
  }

  const updateIndex = index => {
    setVideoIndex({...videoIndex, index})
  }
  //event listener to listen to left (previous) and right (next) arrow keys


  //function to handle click event for selecting another video
  const handleClick = (video, index) => {
    console.log(index)
    setSelectedVideo(video)
    updateIndex(index)
  }

  //listener for previous button click
  const handlePrevious = () => {
    let newIndex = 0
    if (videoIndex.index === 0) {
      newIndex = videoIndex.maxLength - 1
      updateIndex(newIndex)
      setSelectedVideo(animeVideos[newIndex])
    }
    else {
      newIndex = (videoIndex.index - 1) % videoIndex.maxLength
      updateIndex(newIndex)
      setSelectedVideo(animeVideos[newIndex])
    }
  }
  
  //listener for next button click
  const handleNext = () => {
    let newIndex = (videoIndex.index + 1) % videoIndex.maxLength
    updateIndex(newIndex)
    setSelectedVideo(animeVideos[newIndex])
  }

  useEffect(() => {
    //set search to null in event user searches same anime again
    API.getWiki(mal_id, title)
      .then(({ data: { wikiPage, title: englishTitle } }) => {
        //if english title is returned due to title not being found in reddit wiki, run getVideos with english title (title returned from call)
        API.getVideos(englishTitle ? englishTitle : title, wikiPage)
          .then(({ data }) => {
            //remove first element in data (element contains mal id and anime name)
            data.shift()
            console.log(data)
            setAnimeVideos(data)
            const firstValidLink = data.find((animeVideo) =>
              animeVideo.hasOwnProperty('link')
            )
            // No longer picks the best ed, sad raphtalia noises
            setSelectedVideo(firstValidLink)
            updateVideoIndex(0, data.length)
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
    const listAnimeVideos = animeVideos.map((animeVideo, index) =>
      animeVideo.link ? (
        <Paper
          elevation = {3}
          className = {index === 0 ? classes.sideVideo : `${classes.sideVideo} ${classes.sideVideoMargin}`}
          onClick={() => {
            handleClick(animeVideo, index)
          }}
        >
          <Grid container className = {classes.fillHeight}>
            <Grid item xs={4}>
              <img
                src='https://i.imgur.com/I2jULg9.png'
                alt='thumbnail'
              />
            </Grid>
            <Grid item xs={8} className = {classes.sideVideoDetail}>
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
        <Grid container>
          <Grid item xs = {12} lg = {9} className = {classes.videoPlayer}>
            {/* Video that is playing */}
              <Grid container>
                <Grid item xs = {12} className = {classes.video}>
                  <VideoPlayer videoSrc={selectedVideo.link}></VideoPlayer>
                </Grid>
                <Grid item xs={12} className = {classes.videoDetail}>
                  <Grid container>
                    <Grid item lg = {9} xs = {12}>
                      <Typography component="h4" variant="h4">
                        {`${selectedVideo.number}: ${selectedVideo.title}`}
                      </Typography>
                    </Grid>
                    <Grid item lg = {3} xs = {12} className = {classes.buttonGroup}>
                      <SkipPrevious className = {classes.buttonControls} fontSize = "large" onClick = {handlePrevious}/>
                      <SkipNext className = {classes.buttonControls} fontSize = "large" onClick = {handleNext}/>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
          </Grid> 
          <Grid item xs={12} lg={3} className = {classes.sideBar} direction = 'column'>
            {/* Video Selection sidebar */}
              {listAnimeVideos}
          </Grid>
        </Grid>
        <KeyboardEventHandler 
          handleEventType = 'keyup'
          handleKeys = {['left', 'right']}
          onKeyEvent = {(key, e) => {
            let newIndex = 0
            if(key === 'left'){
              console.log('left')
              //if user is on first video, send them to last video
              handlePrevious()
            }
            else{
              handleNext()
            }
          }}
        />
      </div>
    )
  }
}

export default VideoList
