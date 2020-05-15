import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
              <Button size="small" color="primary">
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