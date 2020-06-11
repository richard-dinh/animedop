import React from 'react'
import ReactPlayer from 'react-player'

const VideoPlayer = ({ videoSrc }) => {
  return (
    <ReactPlayer
      url={videoSrc}
      autoPlay = {false}
      controls
      width='100%'
      height='auto'
      volume={0.6}
    ></ReactPlayer>
  )
}

export default VideoPlayer
