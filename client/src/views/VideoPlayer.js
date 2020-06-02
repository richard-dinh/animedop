import React from 'react'
import ReactPlayer from 'react-player'

const VideoPlayer = ({ videoSrc }) => {
  return (
    <ReactPlayer
      url={videoSrc}
      playing
      controls
      width='100%'
      height='100%'
      volume={0.6}
    ></ReactPlayer>
  )
}

export default VideoPlayer
