// To replace the original client App.js
import React from 'react'
import { Grid } from '@material-ui/core'
import { SearchBar, VideoDetail, VideoList } from './components'
import { VideoProvider } from './context/VideoContext'
import { useMediaQuery } from './components/MediaQuery'
function App() {
  const isNotMobile = useMediaQuery('(min-width: 882px')

  const styleVideoList = {
    minHeight: '100vh',
    padding: '12px 25px 25px 25px',
    marginBottom: isNotMobile ? '10px' : '20px',
  }

  return (
    <VideoProvider>
      <Grid container spacing={3} justify='center'>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {/* Search bar */}
            <Grid item xs={12}>
              <SearchBar />
            </Grid>
            {/* Video Detail */}
            <Grid item lg={8} xs={12} style={styleVideoList}>
              <VideoDetail />
            </Grid>
            {/* Video List */}
            <Grid item lg={4} xs={12}>
              <VideoList />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </VideoProvider>
  )
}

export default App
