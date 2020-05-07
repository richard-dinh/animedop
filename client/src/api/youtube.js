import axios from 'axios'

// Make get requests easier
export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
})
