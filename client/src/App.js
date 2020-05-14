// To replace the original client App.js
import React from 'react'
import Home from './views/Home.js' 
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
function App() {
  //checking for screen width

  return (
    <Router>
      <Switch>
        <Route path = '/'>
          <Home/>
        </Route>
      </Switch>
    </Router>

  )
}

export default App
