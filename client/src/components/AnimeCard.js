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
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  }
}))

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const AnimeCard = () => {
  const classes = useStyles()

  return (
    <>
    {
      cards.map((card) => (
        <Grid item key={card} xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image="https://source.unsplash.com/random"
              title="Image title"
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                Heading
                    </Typography>
              <Typography>
                This is a media card. You can use this section to describe the content.
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