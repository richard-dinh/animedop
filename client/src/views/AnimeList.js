import React, {useContext, useEffect, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { AnimeCard, Heading } from '../components/index'
import AnimeContext from '../utils/context/AnimeContext.js'
import {useHistory} from 'react-router-dom'
import API from '../utils/api/api'
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
  const {search, mal_id, title, updateTitleAndMAL} = useContext(AnimeContext)
  const [animeList, setAnimeList] = useState([])

  //run when search is updated
  useEffect(() => {
    //check if search and previousSearch dont exist, if they dont, return to homepage
    if (!search && !localStorage.getItem('previousSearch')) {
      history.push('/')
    }
    else{
      //if user return to search view from video view, get the user's last search
      let tempSearch = search ? null : localStorage.getItem('previousSearch')
      API.jikan(tempSearch ?? search)
      .then( ({data :{results}}) => {
        //filter results for anime that have a start date (only getting anime that have already aired)
        results = results.filter(anime => anime.start_date)
        console.log(results)
        setAnimeList(results)
        updateTitleAndMAL(null, tempSearch ?? search)
        
      })
      .catch(err => console.error(err))
    }
  }, [search])

  useEffect(() => {
    console.log(title, mal_id, search)
    if(title && mal_id){
      console.log('ping2')
      history.push(`/watch/${title}`)
    }
  }, [title, mal_id])
  return (  
    <>
      <CssBaseline />
      {/* <Heading /> */}
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing = {4}>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>
                Search Results For: {search}
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