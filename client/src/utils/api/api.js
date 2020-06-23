import axios from 'axios'


const API = {
  jikan: title => axios.get(`https://api.jikan.moe/v3/search/anime?q=${encodeURIComponent(title)}&limit=30`),
  // jikan: title => axios.get(`https://api.jikan.moe/v3/search/anime?q=${encodeURIComponent(title)}&order_by=members&sort=desc&limit=30`),
  getWiki: (mal_id, title) => axios.get(`/api/animesearch/${mal_id}/${encodeURIComponent(title)}`),
  getVideos: (title, wikiPage) => axios.get(`/api/anime/${encodeURIComponent(title)}/${encodeURIComponent(wikiPage)}`)
}

export default API