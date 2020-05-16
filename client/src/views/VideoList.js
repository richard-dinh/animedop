import React, {useState, useContext, useEffect} from 'react'
import API from '../utils/api/api.js'
import AnimeContext from '../utils/context/AnimeContext.js'
const VideoList = () => {

  const {wikiPage, updateWikiPage, mal_id, videos, updateVideos, title, updateSearch} = useContext(AnimeContext)

  useEffect(() => {
  updateSearch(null)
  API.getWiki(mal_id, title)
  .then( ({data: {wikiPage, title: englishTitle}}) => {
    console.log(wikiPage, englishTitle)
    //if english title is returned due to title not being found in reddit wiki, run getVideos with english title (title returned from call)
    API.getVideos(englishTitle ? englishTitle : title, wikiPage)
    .then( ({data}) => {
      console.log(data)
    })
    .catch(err => console.error(err))
  })
  .catch(err => console.error(err))
  }, [])

  return (
    <p>Video List</p>
  )
}

export default VideoList