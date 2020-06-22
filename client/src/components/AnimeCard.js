import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {Grid, Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core'
import AnimeContext from '../utils/context/AnimeContext.js'

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '150%',
    //when screen is in mobile view, changes image size
    [theme.breakpoints.down('sm')]: {
      paddingTop: '80%',
    },
  },
  cardContent: {
    flexGrow: 1,
  },
}))

const AnimeCard = (props) => {
  const classes = useStyles()
  const animeList = props.list
  const { updateTitleAndMAL } = useContext(AnimeContext)

  const handleClick = (mal_id, title) => {
    updateTitleAndMAL(mal_id, title)
  }
  return (
    <>
      {animeList.map((anime) => (
        <Grid item key={anime.title} xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={anime.image_url}
              title={anime.title}
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant='h6' component='h2'>
                {anime.title}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size='small'
                color='primary'
                onClick={() => handleClick(anime.mal_id, anime.title)}
              >
                Watch Op / Ed
              </Button>
              <Button size='small' color='primary'>
                MAL
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </>
  )
}

export default AnimeCard
