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
  animeState.updateSearch = search => {
    //previousSearch variable to save user's last search. Only create item if the value passed in is not null (value is null when user searches same anime twice in a row)
    //Prevents previousSearch from being set to null)
    setAnimeState({ ...animeState, search, videos: [], wikiPage: null, title: null, mal_id: null, selectedVideo: null })
      // if (!search){
      //   setAnimeState({ ...animeState, search: null})
      //   localStorage.setItem('previousSearch', localStorage.getItem('search'))  
      // }
      // else{
      //   setAnimeState({ ...animeState, search, videos: [], wikiPage: null, title: null, mal_id: null, selectedVideo: null })
      // }
    localStorage.setItem('search', search)
  }
  animeState.updateVideos = (videos) => {
    setAnimeState({ ...animeState, videos })
  }
  animeState.updateWikiPage = (wikiPage) => {
    setAnimeState({ ...animeState, wikiPage })
  }
  animeState.updateTitleAndMAL = (mal_id, title) => {
    //function only runs when someone clicks on the anime they want to watch op/ed of.
    //Need to set search to null here to prevent asyncrouns call when getting pushed to VideoList page. 
    setAnimeState({ ...animeState, mal_id, title, search: null})

    //set previous search to what they searched then empty out search so they can do another search(need another variable in the event they search up the same anime again)

    //check if there is a search is localStorage before setting previous search. Bug fix for when user presses back on vidoPlayer view and clicks to watch another anime OP/ED
    if (localStorage.getItem('search')){
      localStorage.setItem('previousSearch', localStorage.getItem('search'))
    }
    localStorage.removeItem('search')
  }
  animeState.setSelectedVideo = (selectedVideo) => {
    //set search to null to prevent VideoList from getting pushed back to AnimeList due to async
    console.log(animeState)
    setAnimeState({ ...animeState, selectedVideo, mal_id: null, title: null})
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
    <>
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
    </>
  )
}

export default App
