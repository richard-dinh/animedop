import {createContext} from 'react'

const AnimeContext = createContext({
  title: null,
  updateTitle: () => {}
})

export default AnimeContext