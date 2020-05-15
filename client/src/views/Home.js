import React, {useEffect, useContext} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AnimeContext from '../utils/context/AnimeContext.js'

const Home = () => {

  const {updateSearch} = useContext(AnimeContext)
  useEffect(()=> { 
    updateSearch(null)
    localStorage.removeItem('search')
    }, [])

  return (
    <>
      <CssBaseline />
    </>
  )
}

export default Home