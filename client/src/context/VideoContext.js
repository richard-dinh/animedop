import React, { useState, createContext } from 'react'

export const VideoContext = createContext()

export const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState([])
  const [videoSelected, setVideoSelected] = useState('')
  const [query, setQuery] = useState('Tate No Yuusha No Nariagari')

  const onVideoSelected = (video) => {
    setVideoSelected(video.link)
    setQuery(query)
  }

  return (
    <VideoContext.Provider
      value={{
        valueVideos: [videos, setVideos],
        valueVideoSelected: [videoSelected, setVideoSelected],
        valueQuery: [query, setQuery],
        valueOnVideoSelected: onVideoSelected,
      }}
    >
      {children}
    </VideoContext.Provider>
  )
}
