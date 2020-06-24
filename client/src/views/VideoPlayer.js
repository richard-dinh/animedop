import React, {MetaHTMLAttributes} from 'react'
import ReactPlayer from 'react-player'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery';

const VideoPlayer = props => {

  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <video
      src = {props.videoSrc}
      preload = 'auto'
      controls
      style = {{height: '80vh'}}
    />
    // <ReactPlayer
    //   url={videoSrc}
    //   playing = {false}
    //   controls
    //   width = '100%'
    //   height = {matches ? 'auto' : '100%'}
    //   volume={0.6}
    // ></ReactPlayer>
  )
}

export default VideoPlayer
