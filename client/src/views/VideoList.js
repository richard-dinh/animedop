import React, { useState, useContext, useEffect } from 'react'
import API from '../utils/api/api.js'
import { useLocation, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import AnimeContext from '../utils/context/AnimeContext.js'
import VideoPlayer from './VideoPlayer'
import {Loading} from '../components'
import { Grid, Paper, Typography, Container, IconButton, Tooltip, Card, CardContent } from '@material-ui/core'
import { SkipPrevious, SkipNext } from '@material-ui/icons'
import KeyboardEventHandler from 'react-keyboard-event-handler'
import FontAwesome from 'react-fontawesome'
const useStyles = makeStyles((theme) => ({
  root: {
    boxSizing: 'border-box',
  },
  sideVideo: {
    display: 'flex',
    cursor: 'pointer',
    maxHeight: '19%',
    backgroundColor: 'rgba(255,255,255,1)'
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
    [theme.breakpoints.down('lg')]: {
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
    zIndex: '4',
    backgroundColor: 'black',
    [theme.breakpoints.down('sm')]: {
      height: 'auto'
    }
  },
  buttonGroup: {
    display: 'flex'
  },
  buttonControls: {
    margin: '0 auto'
  },
  chevrons: {
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    zIndex: '5',
    position: 'absolute',
    top: '40%',
    opacity: '.2',
    '&:hover': {
      opacity: '1'
    }
    // left: '2%'
  },
  titleStyle: {
    overflow: 'hidden',
    height: '90%',
    textOverflow: 'ellipsis',
    whiteSpace: 'pre-line'
  }
}))

const VideoList = () => {
  const classes = useStyles()
  const {
    mal_id,
    title,
    selectedVideo,
    setSelectedVideo,
    updateTitleAndMAL,
    updateNoResultsModal
  } = useContext(AnimeContext)

  const history = useHistory()
  const [animeVideos, setAnimeVideos] = useState([])
  const [videoIndex, setVideoIndex] = useState({
    index: 0,
    maxLength: 0
  })

  const updateVideoIndex = (index, maxLength) => {
    setVideoIndex({ ...videoIndex, index, maxLength })
  }

  const updateIndex = index => {
    setVideoIndex({ ...videoIndex, index })
  }

  //hover state
  const [hover, setHover] = useState(false)


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

  //function to populate animeVideos
  const getAnimeVideos = (mal_id, title) => {
    API.getWiki(mal_id, title)
      .then(({ data: { wikiPage, title: englishTitle } }) => {
        //if english title is returned due to title not being found in reddit wiki, run getVideos with english title (title returned from call)
        console.log(wikiPage, englishTitle)
        API.getVideos(englishTitle ? englishTitle : title, wikiPage)
          .then(({ data }) => {
            //remove first element in data (element contains mal id and anime name)
            data.shift()
            setAnimeVideos(data)
            const firstValidLink = data.find((animeVideo) =>
              animeVideo.hasOwnProperty('link')
            )
            // No longer picks the best ed, sad raphtalia noises
            setSelectedVideo(firstValidLink)
            updateVideoIndex(0, data.length)
          })
          .catch((err) => {
            updateNoResultsModal(true)
            history.push(`/search/${localStorage.getItem('previousSearch')}`)
            console.error(err)
          })
      })
      .catch((err) => {
        updateNoResultsModal(true)
        history.push(`/search/${localStorage.getItem('previousSearch')}`)
        console.error(err)
      })
  }

  const location = useLocation()
  useEffect(() => {
    //destructure location for last two elements
    let [, , title_params, mal_params] = location.pathname.split('/')
    mal_params = parseInt(mal_params)
    if (mal_id && title) {
      getAnimeVideos(mal_id, title)
    }
    else if (((mal_id !== mal_params || title !== title_params)) || ((!mal_id && !title) && (mal_params.toString().length > 0 && title_params.length > 0))) {
      updateTitleAndMAL(mal_params, title_params)
      getAnimeVideos(mal_params, title_params)
    }
    else {
      history.push('/')
    }
    //set search to null in event user searches same anime again
    // let mal = localStorage.getItem('mal_id') ?? mal_id
    // let animeTitle = localStorage.getItem('title') ?? title
  }, [])

  if (!selectedVideo) {
    return (
      <Loading />
    )
  } else {
    const listAnimeVideos = animeVideos.map((animeVideo, index) =>
      animeVideo.link ? (
        // <Paper
        //   elevation={3}
        //   className={index === 0 ? classes.sideVideo : `${classes.sideVideo} ${classes.sideVideoMargin}`}
        //   onClick={() => {
        //     handleClick(animeVideo, index)
        //   }}
        // >
        //   <Grid container className={classes.fillHeight}>
        //     <Grid item xs={4}>
        //       <img
        //         src='https://i.imgur.com/I2jULg9.png'
        //         alt='thumbnail'
        //       />
        //     </Grid>
        //     <Grid item xs={8} className={classes.sideVideoDetail}>
        //       <Typography component="h5" variant="h5">
        //         {animeVideo.title}
        //       </Typography>
        //       <Typography variant="subtitle1" color="textSecondary">
        //         {animeVideo.number}
        //       </Typography>
        //     </Grid>
        //   </Grid>
        // </Paper>
        <Card
          className={index === 0 ? classes.sideVideo : `${classes.sideVideo} ${classes.sideVideoMargin}`}
          onClick={() => {
            handleClick(animeVideo, index)
          }}
        >
          <CardContent>
            <Typography component='h5' variant='h5' className={classes.titleStyle}>
              {animeVideo.title}
            </Typography>
            <Typography variant='subtitle1' color="textSecondary">
              {animeVideo.number}
            </Typography>
          </CardContent>
        </Card>
      ) : null
    )
    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12} md={9} className={classes.videoPlayer}>
            {/* Video that is playing */}
            <Grid container justify='center'>
              <Grid item xs={12} className={classes.video} align='center'
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                <div style={{ position: 'relative' }}>
                  <VideoPlayer videoSrc={selectedVideo.link} />
                  <FontAwesome
                    name="chevron-circle-left"
                    size="5x"
                    onClick={handlePrevious}
                    className={classes.chevrons}
                    style={{ display: hover ? 'block' : 'none', left: '2%' }}
                  />
                  <FontAwesome
                    name="chevron-circle-right"
                    size="5x"
                    onClick={handleNext}
                    className={classes.chevrons}
                    style={{ display: hover ? 'block' : 'none', right: '2%' }}
                  />
                </div>
              </Grid>
              <Grid item xs={12} className={classes.videoDetail}>
                <Grid container>
                  <Grid item md={9} xs={12}>
                    <Typography component="h4" variant="h4">
                      {`${selectedVideo.number}: ${selectedVideo.title}`}
                    </Typography>
                  </Grid>
                  <Grid item md={3} xs={12} className={classes.buttonGroup}>
                    {/* <SkipPrevious className = {classes.buttonControls} fontSize = "large" onClick = {handlePrevious}/>
                      <SkipNext className = {classes.buttonControls} fontSize = "large" onClick = {handleNext}/> */}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={3} className={classes.sideBar} direction='column'>
            {/* Video Selection sidebar */}
            {listAnimeVideos}
          </Grid>
        </Grid>
        <KeyboardEventHandler
          handleEventType='keyup'
          handleKeys={['left', 'right']}
          onKeyEvent={(key, e) => {
            let newIndex = 0
            if (key === 'left') {
              console.log('left')
              //if user is on first video, send them to last video
              handlePrevious()
            }
            else {
              handleNext()
            }
          }}
        />
      </div>
    )
  }
}

export default VideoList
