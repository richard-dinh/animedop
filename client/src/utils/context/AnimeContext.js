import {createContext} from 'react'

const AnimeContext = createContext({
  search: null,
  videos: [],
  wikiPage: null,
  //final title to search anime on wikiPage
  finalTitle: null,
  updateSearch: () => {},
  updateVideos: () => {},
  updateWikiPage: () => {},
  updateFinalTitle: () => {}
})

export default AnimeContext