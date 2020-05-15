import React, {useContext, useEffect, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { AnimeCard, Heading } from '../components/index'
import AnimeContext from '../utils/context/AnimeContext.js'
import {useHistory} from 'react-router-dom'
import jikanAPI from '../utils/api/jikanAPI'
const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const Home = () => {
  const classes = useStyles()

  const history = useHistory()
  //bring in context
  const {title} = useContext(AnimeContext)

  const [animeList, setAnimeList] = useState([])

  //run when title is updated
  useEffect(() => {
    if (!title) {
      history.push('/')
    }
    else{
      console.log('ur mum')
      jikanAPI.getAnime(title)
      .then( ({data :{results}}) => {
        //filter results for anime that have a start date (only getting anime that have already aired)
        results = results.filter(anime => anime.start_date)
        setAnimeList(results)
      })
      .catch(err => console.error(err))
    }
  }, [title])

  return (
    <>
      <CssBaseline />
      {/* <Heading /> */}
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing = {4}>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>
                Search Results For: {title}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            {/* Maps card here */}
            <AnimeCard list = {animeList}/>
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
      </footer>
      {/* End footer */}
    </>
  );
}

export default Home