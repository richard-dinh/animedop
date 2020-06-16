import React from 'react'
import ReactPlayer from 'react-player'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery';

const VideoPlayer = ({ videoSrc }) => {

  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <ReactPlayer
      url={videoSrc}
      playing = {true}
      controls
      width = '100%'
      height = {matches ? 'auto' : '100%'}
      volume={0.6}
    ></ReactPlayer>
  )
}

export default VideoPlayer
