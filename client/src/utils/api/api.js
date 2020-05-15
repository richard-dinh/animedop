import axios from 'axios'


const API = {
  jikan: title => axios.get(`https://api.jikan.moe/v3/search/anime?q=${title}&limit=30`)
}

export default API