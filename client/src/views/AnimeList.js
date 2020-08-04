import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useLocation} from 'react-router-dom'
import { AnimeCard, Loading } from '../components/index'
import { makeStyles } from '@material-ui/core/styles'
import {CssBaseline, Grid, Container, Typography} from '@material-ui/core'
import AnimeContext from '../utils/context/AnimeContext.js'
import API from '../utils/api/api'
const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  }
}))

const Home = () => {
  const classes = useStyles()
  const location = useLocation()
  const history = useHistory()
  //bring in context
  const {
    search,
    mal_id,
    title,
    updateSearch,
  } = useContext(AnimeContext)
  const [animeList, setAnimeList] = useState([])

  //run when search is updated
  useEffect(() => {
    //check if search and previousSearch dont exist, if they dont, return to homepage
    if ((search && location.pathname.substr(location.pathname.lastIndexOf('/') + 1, location.pathname.length) !== search) || (!search && location.pathname.substr(location.pathname.lastIndexOf('/') + 1, location.pathname.length).length > 0)) {
      let params = location.pathname.substr(location.pathname.lastIndexOf('/') + 1, location.pathname.length)
      updateSearch(params)
      //if user return to search view from video view, get the user's last search
      setAnimeList([])
      // console.log(localStorage.getItem('previousSearch'))
      let ifPreviousSearch = params
        ? null
        : localStorage.getItem('previousSearch')
      API.jikan(ifPreviousSearch ?? params)
        .then(({ data: { results } }) => {
          //filter results for anime that have a start date (only getting anime that have already aired)
          results = results.filter((anime) => anime.start_date)
          setAnimeList(results)
          // updateTitleAndMAL(null, tempSearch ?? search)
        })
        .catch((err) => console.error(err))
    }
    else if (!search && !localStorage.getItem('previousSearch')) {
      history.push('/')
    } else if (search || localStorage.getItem('previousSearch')) {
      //if user return to search view from video view, get the user's last search
      setAnimeList([])
      // console.log(localStorage.getItem('previousSearch'))
      let ifPreviousSearch = search
        ? null
        : localStorage.getItem('previousSearch')
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
    if ((title && mal_id) || (localStorage.getItem('title') && localStorage.getItem('mal_id'))) {
      history.push(`/watch/${title || localStorage.getItem('title')}/${mal_id}`)
    }
  }, [title, mal_id])

  if (animeList.length < 1) {
    return (
      <Loading />
    )
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
      </>
    )
  }
}

export default Home
