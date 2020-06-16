import React, { useState, useContext, useEffect } from 'react'
import { makeStyles, fade } from '@material-ui/core/styles'
import {AppBar, Toolbar, Typography, InputBase } from '@material-ui/core'
import {Search, Policy} from '@material-ui/icons'
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
      setUserInput('')
      //pushes user to route
      history.push(`/search/${search}`)
    }
    else if (localStorage.getItem('previousSearch') && !localStorage.getItem('search')) {
      history.push(`/search/${localStorage.getItem('previousSearch')}`)
    }
  }, [search])

  return (
    <>
      <AppBar position='static' className={classes.background}>
        <Toolbar>
          <Policy className={classes.icon} />
          <Typography className = {classes.title} variant='h6' color='inherit' noWrap>
            Animedop
          </Typography>
          <form className={classes.search} onSubmit={handleSubmit}>
            <div className={classes.searchIcon}>
              <Search className={classes.iconFill}/>
            </div>
            <InputBase
              placeholder="Search..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onChange={handleInputChange}
              value={userInput}
            />
          </form>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Heading
