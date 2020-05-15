import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import API from '../utils/api/api.js'
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
      paddingTop: '80%'
    }
  },
  cardContent: {
    flexGrow: 1,
  }
}))

const handleWatch = (mal_id, title) => {
  API.getWiki(mal_id, title)
  .then( ({data: {wikiPage, title: englishTitle}}) => {
    console.log(wikiPage, englishTitle)
    //if english title is returned due to title not being found in reddit wiki, run getVideos with english title (title returned from call)
    if(englishTitle){
      API.getVideos(englishTitle, wikiPage)
      .then( ({data}) => {
        //videos populated here
        console.log(data)
      })
      .catch(err => console.error(err))
    }
    //else do search with original title
    else{
      API.getVideos(title, wikiPage)
        .then(({ data }) => {
          //videos populated here
          console.log(data)
        })
        .catch(err => console.error(err))
    }
  })
  .catch(err => console.error(err))
}
const AnimeCard = props => {
  const classes = useStyles()
  const animeList = props.list
  return (
    <>
    {
      animeList.map((anime) => (
        <Grid item key={anime.title} xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={anime.image_url}
              title={anime.title}
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h6" component="h2">
                {anime.title}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" onClick = {() => handleWatch(anime.mal_id, anime.title)}>
                Watch Op / Ed
              </Button>
              <Button size="small" color="primary">
                MAL
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))
    }
    </>
  )
}

export default AnimeCard