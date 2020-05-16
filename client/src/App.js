// To replace the original client App.js
import React, {useState} from 'react'
import Home from './views/Home.js' 
import AnimeList from './views/AnimeList.js' 
import VideoList from './views/VideoList.js' 
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import AnimeContext from './utils/context/AnimeContext.js'
import {Heading} from './components/index.js'

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
    search: localStorage.getItem('search') ? localStorage.getItem('search') : null,
    videos: [],
    wikiPage: null,
    title: null,
    mal_id: null
  })
  animeState.updateSearch = search => {
    setAnimeState({ ...animeState, search, videos: [], wikiPage: null, title: null, mal_id: null })
      if (!search){
        localStorage.setItem('previousSearch', localStorage.getItem('search'))  
      }
    localStorage.setItem('search', search)
    console.log(localStorage.getItem('search'))
  }
  animeState.updateVideos = videos => {
    setAnimeState({ ...animeState, videos })
  }
  animeState.updateWikiPage = wikiPage => {
    setAnimeState({ ...animeState, wikiPage })
  }
  animeState.updateTitleAndMAL = (mal_id, title) => {
    setAnimeState({ ...animeState, mal_id, title})
  }

  const [initialState, setInitialState] = useState(animeState)
  return (
    <AnimeContext.Provider value = {animeState}>
      <Router>
      <Heading />
        <Switch>
          <Route exact path = '/search/:title'>
            <AnimeList />
          </Route>
          <Route exact path = '/watch/:title'>
            <VideoList />
          </Route>
          <Route path = '/'>
            <Home/>
          </Route>
        </Switch>
      </Router>
    </AnimeContext.Provider>
  )
}

export default App
