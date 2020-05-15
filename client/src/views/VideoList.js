import React, {useState, useContext, useEffect} from 'react'
import API from '../utils/api/api.js'
import AnimeContext from '../utils/context/AnimeContext.js'
const VideoList = () => {

  const {wikiPage, updateWikiPage, mal_id, videos, updateVideos, title} = useContext(AnimeContext)

  useEffect(() => {
    console.log(mal_id)
    console.log(title)
  }, [])

  return (
    <p>Video List</p>
  )
}

export default VideoList