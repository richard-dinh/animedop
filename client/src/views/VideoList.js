import React, {useState, useContext, useEffect} from 'react'
import API from '../utils/api/api.js'
import AnimeContext from '../utils/context/AnimeContext.js'
const VideoList = () => {

  const {videos, updateVideos} = useContext(AnimeContext)

  useEffect(() => {

  }, [videos])
  
  return (
    <p>Video List</p>
  )
}

export default VideoList