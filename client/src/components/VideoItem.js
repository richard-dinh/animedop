import React from 'react'

import { Grid, Paper, Typography } from '@material-ui/core'
// 1 VideoList to Many VideoItems
const VideoItem = ({ video, onVideoSelected }) => {
  return (
    <Grid item xs={12}>
      <Paper
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={() => {
          onVideoSelected(video)
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={7}>
            <img
              // src={video.snippet.thumbnails.medium.url}
              src='https://i.imgur.com/I2jULg9.png'
              alt='thumbnail'
              style={{ marginRight: '2px' }}
            />
          </Grid>

          <Grid item xs={4}>
            <Typography variant='subtitle2'>
              <b>{video.title}</b>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default VideoItem
