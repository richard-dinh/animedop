import axios from 'axios'


const jikanAPI = {
  getAnime: title => axios.get(`https://api.jikan.moe/v3/search/anime?q=${title}&limit=30`)
}

export default jikanAPI