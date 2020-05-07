import React, { useState, createContext } from 'react'

export const VideoContext = createContext()

export const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState([])
  const [videoSelected, setVideoSelected] = useState('')
  const [query, setQuery] = useState('Shield Hero Ed 1')

  const onVideoSelected = (video) => {
    setVideoSelected(video)
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
