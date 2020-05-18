import {createContext} from 'react'

const AnimeContext = createContext({
  search: null,
  videos: [],
  wikiPage: null,
  //title to search anime on wikiPage
  title: null,
  mal_id: null,
  updateSearch: () => {},
  updateVideos: () => {},
  updateWikiPage: () => {},
  updateTitleAndMAL: () => {},
  resetState: () => {},
  newSearch: () => {}
})

export default AnimeContext