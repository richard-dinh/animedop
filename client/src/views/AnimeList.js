import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AnimeCard, Heading } from '../components/index'
import { makeStyles } from '@material-ui/core/styles'
import {CssBaseline, Grid, Container, Typography} from '@material-ui/core'
import AnimeContext from '../utils/context/AnimeContext.js'
import API from '../utils/api/api'
import loadingGif from './../assets/raphtalia-spin.gif'
const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}))

const Home = () => {
  const classes = useStyles()

  const history = useHistory()
  //bring in context
  const {
    search,
    mal_id,
    title,
    updateTitleAndMAL,
    setSelectedVideo,
  } = useContext(AnimeContext)
  const [animeList, setAnimeList] = useState([])

  //run when search is updated
  useEffect(() => {
    //check if search and previousSearch dont exist, if they dont, return to homepage
    if (!search && !localStorage.getItem('previousSearch')) {
      history.push('/')
    } else if (search || localStorage.getItem('previousSearch')) {
      //if user return to search view from video view, get the user's last search
      setAnimeList([])
      // console.log(localStorage.getItem('previousSearch'))
      let ifPreviousSearch = search
        ? null
        : localStorage.getItem('previousSearch')
      console.log(ifPreviousSearch)
      API.jikan(ifPreviousSearch ?? search)
        .then(({ data: { results } }) => {
          //filter results for anime that have a start date (only getting anime that have already aired)
          results = results.filter((anime) => anime.start_date)
          setAnimeList(results)
          // updateTitleAndMAL(null, tempSearch ?? search)
        })
        .catch((err) => console.error(err))
    }
  }, [search])

  useEffect(() => {
    if (title && mal_id) {
      history.push(`/watch/${title}`)
    }
  }, [title, mal_id])

  if (animeList.length < 1) {
    console.log('ur mum')
    return <img src={loadingGif} alt='loading...' />
  } else {
    return (
      <>
        <CssBaseline />
        {/* <Heading /> */}
        <main>
          <Container className={classes.cardGrid} maxWidth='md'>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography variant='h4' gutterBottom>
                  Search Results For:{' '}
                  {search ?? localStorage.getItem('previousSearch')}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              {/* Maps card here */}
              <AnimeCard list={animeList} />
            </Grid>
          </Container>
        </main>
        {/* Footer */}
        <footer className={classes.footer}>
          <Typography variant='h6' align='center' gutterBottom>
            Footer
          </Typography>
          <Typography
            variant='subtitle1'
            align='center'
            color='textSecondary'
            component='p'
          >
            Something here to give the footer a purpose!
          </Typography>
        </footer>
        {/* End footer */}
      </>
    )
  }
}

export default Home
