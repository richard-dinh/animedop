import React, {useState, useContext, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import {useHistory} from 'react-router-dom'
import AnimeContext from '../utils/context/AnimeContext.js'
const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const SearchBar = () => {
  const classes = useStyles();
  //use history for redirecting
  let history = useHistory()

  //state to hold search string
  const [userInput, setUserInput] = useState('')

  //bring in animeContext to store title
  const {search, updateSearch, mal_id, title} = useContext(AnimeContext)
  const handleInputChange = event => {
    setUserInput(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    updateSearch(userInput)
  }

  //runs when search is updated
  useEffect(()=> {
    if(search){
      //empty our search
      //pushes user to route
      setUserInput('')
      history.push(`/search/${search}`)
    }
    else if (localStorage.getItem('previousSearch') && !localStorage.getItem('search')){
      history.push(`/search/${localStorage.getItem('previousSearch')}`)
    }
  }, [search])

  return (
    <Paper component="form" className={classes.root} onSubmit = {handleSubmit}>
      <InputBase
        className={classes.input}
        name = "search"
        onChange = {handleInputChange}
        placeholder="Search Anime"
        value = {userInput}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default SearchBar