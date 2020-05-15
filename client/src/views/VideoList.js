import React, {useState, useContext, useEffect} from 'react'
import API from '../utils/api/api.js'
import AnimeContext from '../utils/context/AnimeContext.js'
const VideoList = () => {

  const {wikiPage, updateWikiPage, mal_id, videos, updateVideos, title} = useContext(AnimeContext)

  useEffect(() => {
  API.getWiki(mal_id, title)
  .then( ({data: {wikiPage, title: englishTitle}}) => {
    console.log(wikiPage, englishTitle)
    //if english title is returned due to title not being found in reddit wiki, run getVideos with english title (title returned from call)
    if(englishTitle){
      API.getVideos(englishTitle, wikiPage)
      .then( ({data}) => {
        //videos populated here
        console.log(data)
      })
      .catch(err => console.error(err))
    }
    //else do search with original title
    else{
      API.getVideos(title, wikiPage)
        .then(({ data }) => {
          //videos populated here
          console.log(data)
        })
        .catch(err => console.error(err))
    }
  })
  .catch(err => console.error(err))
  }, [])

  return (
    <p>Video List</p>
  )
}

export default VideoList