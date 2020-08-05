import React, {useEffect, useContext} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AnimeContext from '../utils/context/AnimeContext.js'
import {Modal} from '../components/index'
const Home = () => {

  const {updateSearch} = useContext(AnimeContext)
  useEffect(()=> { 
    updateSearch(null)
    localStorage.removeItem('search')
    localStorage.removeItem('previousSearch')
    }, [])

  return (
    <>
      <CssBaseline />
      {/* Only display Modal once (when user first enters website). Once user closes modal, displayModal is set to false */}
      {localStorage.getItem('welcomeModal') ? null : <Modal title={'Welcome to Animedop!'} description={'Search up Animes by title and watch their Opening and Endings!'}/>}
    </>
  )
}

export default Home