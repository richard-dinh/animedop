import React, { useEffect } from 'react'
import {
  Grid,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from '@material-ui/core'
import { useContext } from 'react'
import { VideoContext } from '../context/VideoContext'
import { Link } from 'react-router-dom'

const VideoGrid = () => {
  // Context
  const { valueAnimes, valueVideoSelected } = useContext(VideoContext)
  const animes = valueAnimes[0]
  const setVideoSelected = valueVideoSelected[1]

  useEffect(() => {
    // Clear selectedAnime
    localStorage.removeItem('selectedAnime')
  }, [])

  // Empty grid, if no animes selected
  if (animes.length <= 0) {
    return <div>Here</div>
  }
  // Style
  const styleCardAnime = {
    maxWidth: 400,
    textAlign: 'center',
  }

  const goToMal = (url) => {
    window.location.href = url
  }

  return (
    <Grid
      container
      spacing={3}
      direction='row'
      justify='center'
      alignItems='flex-start'
    >
      {animes.map((anime) => (
        <Grid item lg={4} md={6} sm={6} xs={12} key={anime.mal_id}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'inline-block' }}>
              {/* Card */}
              <Card className={'cardAnime'} style={styleCardAnime}>
                <CardActionArea>
                  <CardMedia
                    component='img'
                    alt=''
                    height='300'
                    image={anime.img}
                    title={anime.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='h2'>
                      {anime.title}
                    </Typography>
                    <Typography
                      variant='body2'
                      color='textSecondary'
                      component='p'
                    >
                      {anime.synopsis}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  {/* Watch */}
                  <Link to={`/poo/${anime.mal_id}`}>
                    <Button size='small' color='primary'>
                      Watch Op/Ed
                    </Button>
                  </Link>
                  {/* Mal */}
                  <Button
                    size='small'
                    color='primary'
                    onClick={() => goToMal(anime.url)}
                  >
                    {`Go to MAL`}
                  </Button>
                </CardActions>
              </Card>
            </div>
          </div>
        </Grid>
      ))}
    </Grid>
  )
}

export default VideoGrid
