import { createContext } from 'react'

const AnimeContext = createContext({
  search: null,
  videos: [],
  wikiPage: null,
  //title to search anime on wikiPage
  title: null,
  mal_id: null,
  selectedVideo: null,
  //variable to check whether to display introduction modal
  updateSearch: () => {},
  updateVideos: () => {},
  updateWikiPage: () => {},
  updateTitleAndMAL: () => {},
})

export default AnimeContext
