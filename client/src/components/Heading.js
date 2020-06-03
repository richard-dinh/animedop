import React, { useState, useContext, useEffect } from 'react'
import { makeStyles, fade } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import PolicyIcon from '@material-ui/icons/Policy'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase';
import { useHistory } from 'react-router-dom'
import AnimeContext from '../utils/context/AnimeContext.js'
const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  iconFill: {
    fill: "gray",
    zIndex: '2'
  },
  background: {
    backgroundColor: '#5E784D',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 1),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 1),  
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    backgroundColor: 'white',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    backgroundColor: 'white',
    color: 'black',
    zIndex: '1',
    paddingLeft: `calc(1em + ${theme.spacing(5)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}))

const Heading = () => {

  const classes = useStyles()

  //use history for redirecting
  let history = useHistory()

  //state to hold search string
  const [userInput, setUserInput] = useState('')

  const {
    search,
    updateSearch,
    resetState,
    mal_id,
    title,
    newSearch,
  } = useContext(AnimeContext)

  const handleInputChange = (event) => {
    setUserInput(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    updateSearch(userInput)
  }

  //runs when search is updated
  useEffect(() => {
    if (search) {
      //empty our search
      //pushes user to route
      console.log('ping')
      setUserInput('')
      history.push(`/search/${search}`)
    }
  }, [search])

  return (
    <>
      <AppBar position='static' className={classes.background}>
        <Toolbar>
          <PolicyIcon className={classes.icon} />
          <Typography className = {classes.title} variant='h6' color='inherit' noWrap>
            Animedop
          </Typography>
          <form className={classes.search} onSubmit={handleSubmit}>
            <div className={classes.searchIcon}>
              <SearchIcon className={classes.iconFill}/>
            </div>
            <InputBase
              placeholder="Search..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              // inputProps={{ 'aria-label': 'search' }}
              onChange={handleInputChange}
              value={userInput}
            />
          </form>
        </Toolbar>
      </AppBar>
      {/* <div className={classes.heroContent}>
        <Container maxWidth='sm'>
          <Typography
            component='h1'
            variant='h2'
            align='center'
            color='textPrimary'
            gutterBottom
          >
            Animedop
          </Typography>
          <Typography
            variant='h5'
            align='center'
            color='textSecondary'
            paragraph
          >
            Search supports English and Japanese titles!
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify='center'>
              Search Bar here
              <Search />
            </Grid>
          </div>
        </Container>
      </div> */}
    </>
  )
}

export default Heading
