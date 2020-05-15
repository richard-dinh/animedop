import {createContext} from 'react'

const AnimeContext = createContext({
  title: null,
  videos: [],
  wikiPage: null,
  //final title to search anime on wikiPage
  finalTitle: null,
  updateTitle: () => {},
  updateVideos: () => {},
  updateWikiPage: () => {},
  updateFinalTitle: () => {}
})

export default AnimeContext