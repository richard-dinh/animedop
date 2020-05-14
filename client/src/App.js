// To replace the original client App.js
import React, {useState} from 'react'
import Home from './views/Home.js' 
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path = '/anime/:title'>
          <p>Anime route</p>
        </Route>
        <Route path = '/themes/:title'>
          <p>Theme Route</p>
        </Route>
        <Route path = '/'>
          <Home/>
        </Route>
      </Switch>
    </Router>

  )
}

export default App
