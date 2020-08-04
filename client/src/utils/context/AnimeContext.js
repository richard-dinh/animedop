import { createContext } from 'react'

const AnimeContext = createContext({
  search: null,
  videos: [],
  wikiPage: null,
  //title to search anime on wikiPage
  title: null,
  mal_id: null,
  selectedVideo: null,
  displayModal: true,
  //variable to check whether to display introduction modal
  noResultsModal: false,
  updateSearch: () => {},
  updateVideos: () => {},
  updateWikiPage: () => {},
  updateTitleAndMAL: () => {},
  updateNoResultsModal: () => {},
  setSelectedVideo: () => {},
  updateDisplayModal: () => {}
})

export default AnimeContext
