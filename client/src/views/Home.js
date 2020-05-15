import React, {useEffect, useContext} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AnimeContext from '../utils/context/AnimeContext.js'

const Home = () => {

  const {updateTitle} = useContext(AnimeContext)
  useEffect(()=> { 
    updateTitle(null)
    localStorage.removeItem('title')
    }, [])

  return (
    <>
      <CssBaseline />
    </>
  )
}

export default Home