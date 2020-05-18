import React, { useContext } from 'react'
import { Grid } from '@material-ui/core'
import VideoItem from './VideoItem'
import { VideoContext } from './../context/VideoContext'
import { useHistory } from 'react-router-dom'
const VideoList = () => {
  const history = useHistory()
  // Context
  const { valueVideos, valueOnVideoSelected } = useContext(VideoContext)
  const videos = valueVideos[0]
  const onVideoSelected = valueOnVideoSelected
  // if (videos === undefined || (videos.length == 0 && onVideoSelected == '')) {
  //   history.push('/')
  // }
  const listVideos = videos.map((video, id) => (
    <VideoItem key={id} video={video} onVideoSelected={onVideoSelected} />
  ))
  return (
    <Grid container spacing={4}>
      {listVideos}
    </Grid>
  )
}

export default VideoList
