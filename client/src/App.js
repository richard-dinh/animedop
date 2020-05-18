// To replace the original client App.js
import React from 'react'
import { Grid } from '@material-ui/core'
import { SearchBar, VideoDetail, VideoList, VideoGrid } from './components'
import { VideoProvider } from './context/VideoContext'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from 'react-router-dom'

// import { useMediaQuery } from './components/MediaQuery'
function App() {
  // const isNotMobile = useMediaQuery('(min-width: 882px')

  // const styleVideoList = {
  //   minHeight: '100vh',
  //   padding: '12px 25px 25px 25px',
  //   marginBottom: isNotMobile ? '10px' : '20px',
  // }

  const Poo = () => {
    let { id } = useParams()
    return (
      <Grid container spacing={3} justify='center'>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {/* Search bar */}
            <Grid item xs={12}>
              <SearchBar />
            </Grid>
            {/* Video Detail */}
            <Grid item lg={8} xs={12}>
              <VideoDetail animeId={id} />
            </Grid>

            {/* Video List */}
            <Grid item lg={4} xs={12}>
              <VideoList />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  const Home = () => {
    return (
      <Grid container spacing={3} justify='center'>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {/* Search bar */}
            <Grid item xs={12}>
              <SearchBar />
            </Grid>
            <Grid item xs={12}>
              <Grid item xs={12}>
                <VideoGrid />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  return (
    <Router>
      <VideoProvider>
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/poo/:id' exact>
            <Poo />
          </Route>
        </Switch>
      </VideoProvider>
    </Router>
  )
}

export default App
