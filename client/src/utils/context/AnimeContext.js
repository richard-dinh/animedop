import {createContext} from 'react'

const AnimeContext = createContext({
  title: '',
  updateTitle: () => {}
})

export default AnimeContext