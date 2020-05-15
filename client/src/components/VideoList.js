import React, { useContext } from 'react'
import { Grid } from '@material-ui/core'
import VideoItem from './VideoItem'
import { VideoContext } from './../context/VideoContext'

const VideoList = () => {
  const { valueVideos, valueOnVideoSelected } = useContext(VideoContext)
  const videos = valueVideos[0]
  const onVideoSelected = valueOnVideoSelected
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
