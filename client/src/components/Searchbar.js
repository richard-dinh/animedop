import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

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
  const [search, setSearch] = useState('')
  const handleInputChange = event => {
    setSearch(event.target.value)
  }
  const handleSubmit = event => {
    event.preventDefault()
    console.log(search)
    setSearch('')
  }
  return (
    <Paper component="form" className={classes.root} onSubmit = {handleSubmit}>
      <InputBase
        className={classes.input}
        name = "search"
        onChange = {handleInputChange}
        placeholder="Search Anime"
        value = {search}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default SearchBar