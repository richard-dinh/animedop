// To replace the original client App.js
import React, {useState} from 'react'
import Home from './views/Home.js' 
import AnimeList from './views/AnimeList.js' 
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import AnimeContext from './utils/context/AnimeContext.js'
import {Heading} from './components/index.js'
function App() {

  const [animeState, setAnimeState] = useState({
    title: localStorage.getItem('title') ? localStorage.getItem('title') : null
  })
  animeState.updateTitle = title => {
    setAnimeState({...animeState, title})
    localStorage.setItem('title', title)
  }
  return (
    <AnimeContext.Provider value = {animeState}>
      <Router>
      <Heading />
        <Switch>
          <Route exact path = '/search/:title'>
            <AnimeList />
          </Route>
          <Route exact path = '/watch/:title'>
            <p>Theme Route</p>
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
