import React from 'react'

import { Grid, Paper, Typography } from '@material-ui/core'

const VideoItem = ({ video, onVideoSelected }) => {
  const playSelectedVideo = () => {
    onVideoSelected(video)
  }

  return (
    <Grid items xs={12}>
      <Paper
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={playSelectedVideo}
      >
        <Grid container spacing={4}>
          <Grid item xs={7}>
            <img
              src={video.snippet.thumbnails.medium.url}
              alt='thumbnail'
              style={{ marginRight: '2px' }}
            />
          </Grid>

          <Grid item xs={4}>
            <Typography variant='subtitle2'>
              <b>{video.snippet.title}</b>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default VideoItem
