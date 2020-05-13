import React from 'react'
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
  const styleCardAnime = {
    maxWidth: 400,
    textAlign: 'center',
  }

  const { valueAnimes } = useContext(VideoContext)
  const animes = valueAnimes[0]
  if (animes.length <= 0) {
    return <div>...</div>
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
      textAlign='center'
    >
      {animes.map((anime) => (
        <Grid item lg={4} md={6} sm={6} xs={12}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'inline-block' }}>
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
                  <Link to={`/poo/${anime.mal_id}`}>
                    <Button size='small' color='primary'>
                      Watch Op/Ed
                    </Button>
                  </Link>

                  <Button
                    size='small'
                    color='primary'
                    onClick={() => goToMal(anime.url)}
                  >
                    {`Go to MAL`}
                    {/* {`Go to MAL ${anime.url}`} */}
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
