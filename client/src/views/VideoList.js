import React, { useState, useContext, useEffect } from 'react'
import API from '../utils/api/api.js'
import AnimeContext from '../utils/context/AnimeContext.js'
import VideoPlayer from './VideoPlayer'
import loadingGif from './../assets/raphtalia-spin.gif'

const VideoList = () => {
  const {
    wikiPage,
    updateWikiPage,
    mal_id,
    videos,
    updateVideos,
    title,
    selectedVideo,
    setSelectedVideo,
    updateSearch
  } = useContext(AnimeContext)

  useEffect(() => {
    //set search to null in event user searches same anime again
    // updateSearch(null)
    API.getWiki(mal_id, title)
      .then(({ data: { wikiPage, title: englishTitle } }) => {
        //if english title is returned due to title not being found in reddit wiki, run getVideos with english title (title returned from call)
        API.getVideos(englishTitle ? englishTitle : title, wikiPage)
          .then(({ data }) => {
            // Pick the best ED, happy raphtalia noises
            setSelectedVideo(data[3])
          })
          .catch((err) => console.error(err))
      })
      .catch((err) => console.error(err))
  }, [])

  if (!selectedVideo) {
    return (
      <div>
        <img src={loadingGif} alt='loading...' />
      </div>
    )
  } else {
    // console.log('data: ' + JSON.stringify(selectedVideo))
    return (
      <div>
        <VideoPlayer videoSrc={selectedVideo.link}></VideoPlayer>
      </div>
    )
  }
}

export default VideoList
