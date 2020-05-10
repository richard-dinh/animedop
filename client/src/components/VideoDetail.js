import React, { useContext } from 'react'
import ReactPlayer from 'react-player'
import { VideoContext } from './../context/VideoContext'

// Typo = paragraph, any text
import {
  Paper,
  Typography,
  //  Grid
} from '@material-ui/core'

const VideoDetail = () => {
  const { valueVideoSelected } = useContext(VideoContext)
  const videoSelected = valueVideoSelected[0]
  if (!videoSelected) return <div>Loading...</div>
  // const videoSrc = `https://www.youtube.com/watch?v=${videoSelected.id.videoId}`
  const videoSrc = `${videoSelected}`
  return (
    <React.Fragment>
      <Paper elevation={6} style={{ height: '80%' }}>
        {/* <Grid spacing={4}>
          <Grid items xs={12}> */}
        <ReactPlayer
          url={videoSrc}
          playing
          controls
          width='100%'
          height='100%'
        />
        {/* </Grid>
        </Grid> */}
      </Paper>
      {/* <Paper elevation={6} style={{ padding: '15px' }}>
        <Typography variant='h4'>{videoSelected.snippet.title}</Typography>
        <Typography variant='subtitle1'>
          {videoSelected.snippet.channelTitle}
        </Typography>
        <Typography variant='subtitle2'>
          {videoSelected.snippet.description}
        </Typography>
      </Paper> */}
    </React.Fragment>
  )
}

export default VideoDetail
