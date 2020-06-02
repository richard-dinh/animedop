// To replace the original client App.js
import React, { useState, useEffect } from 'react'
import Home from './views/Home.js'
import AnimeList from './views/AnimeList.js'
import VideoList from './views/VideoList.js'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AnimeContext from './utils/context/AnimeContext.js'
import { Heading } from './components/index.js'
import './styles.css'
import { useTransition, animated, config } from 'react-spring'

// const useAnimeState = props => {
//   let initialState = {... props}
//   const [animeState, setAnimeState] = useState({
//     search: localStorage.getItem('search') ? localStorage.getItem('search') : null,
//     videos: [],
//     wikiPage: null,
//     title: null,
//     mal_id: null
//   })
//   animeState.updateSearch = search => {
//     setAnimeState({ ...animeState, search })
//     localStorage.setItem('search', search)
//   }
//   animeState.updateVideos = videos => {
//     setAnimeState({ ...animeState, videos })
//   }
//   animeState.updateWikiPage = wikiPage => {
//     setAnimeState({ ...animeState, wikiPage })
//   }
//   animeState.updateTitleAndMAL = (mal_id, title) => {
//     setAnimeState({ ...animeState, mal_id, title })
//   }
//   animeState.resetState = () => {
//     setAnimeState({ ...animeState, videos: [], wikiPage: null, title: null, mal_id: null })
//   }
//   animeState.newSearch = search => {
//     setAnimeState({ ...animeState, search, videos: [], wikiPage: null, title: null, mal_id: null })
//   }
//   return animeState
// }

function App() {
  const [animeState, setAnimeState] = useState({
    search: localStorage.getItem('search')
      ? localStorage.getItem('search')
      : null,
    videos: [],
    wikiPage: null,
    title: null,
    mal_id: null,
    selectedVideo: null,
  })
  animeState.updateSearch = (search) => {
    setAnimeState({ ...animeState, search })
    localStorage.setItem('search', search)
  }
  animeState.updateVideos = (videos) => {
    setAnimeState({ ...animeState, videos })
  }
  animeState.updateWikiPage = (wikiPage) => {
    setAnimeState({ ...animeState, wikiPage })
  }
  animeState.updateTitleAndMAL = (mal_id, title) => {
    setAnimeState({ ...animeState, mal_id, title })
  }
  animeState.setSelectedVideo = (selectedVideo) => {
    setAnimeState({ ...animeState, selectedVideo })
  }
  animeState.resetState = () => {
    setAnimeState({
      ...animeState,
      videos: [],
      wikiPage: null,
      title: null,
      mal_id: null,
    })
  }
  animeState.newSearch = (search) => {
    setAnimeState({
      ...animeState,
      search,
      videos: [],
      wikiPage: null,
      title: null,
      mal_id: null,
    })
  }
  const [initialState, setInitialState] = useState(animeState)

  const slides = [
    { id: 0, url: 'https://images6.alphacoders.com/991/991043.jpg' },
    { id: 1, url: 'https://images6.alphacoders.com/993/thumb-1920-993076.png' },
    {
      id: 2,
      url:
        'https://c.wallhere.com/photos/3a/4a/anime_girls_loli_eating_Tate_no_Yuusha_no_Nariagari_Raphtalia-1777113.jpg!d',
    },
    {
      id: 3,
      url: 'https://i.redd.it/a4j441jejgy21.jpg',
    },
  ]

  // const slides = [
  //   {
  //     id: 0,
  //     url:
  //       'photo-1544511916-0148ccdeb877?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1901&q=80i',
  //   },
  //   {
  //     id: 1,
  //     url:
  //       'photo-1544572571-ab94fd872ce4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1534&q=80',
  //   },
  //   {
  //     id: 2,
  //     url:
  //       'reserve/bnW1TuTV2YGcoh1HyWNQ_IMG_0207.JPG?ixlib=rb-1.2.1&w=1534&q=80',
  //   },
  //   { id: 3, url: 'photo-1540206395-68808572332f?ixlib=rb-1.2.1&w=1181&q=80' },
  // ]

  const [index, setIndex] = useState(0)
  const transitions = useTransition(slides[index], (item) => item.id, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.molasses,
  })
  useEffect(
    () =>
      void setInterval(() => setIndex((index) => (index + 1) % slides.length), 10000),
    []
  )

  return (
    <div>
      <div>
        {transitions.map(({ item, props, key }) => (
          <animated.div
            key={key}
            class='bg'
            style={{
              ...props,
              backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0) 60%, rgb(255, 255, 255)), url(${item.url})`,
            }}
          ></animated.div>
        ))}
      </div>
      <AnimeContext.Provider value={animeState}>
        <Router>
          <Heading />
          <Switch>
            <Route exact path='/search/:title'>
              <AnimeList />
            </Route>
            <Route exact path='/watch/:title'>
              <VideoList />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </Router>
      </AnimeContext.Provider>
    </div>
  )
}

export default App
