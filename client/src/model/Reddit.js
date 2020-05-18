import axios from 'axios'

const resultsJikanFromTitle = (title) => {
  return axios
    .get(`https://api.jikan.moe/v3/search/anime?q=${title}&limit=30`)
    .then(({ data: { results } }) => {
      console.log(results)
      return results
    })
    .catch((err) => console.error(err))
}

// Get Op and Endings
const getOpAndEd = async (wiki, title, img) => {
  try {
    console.log(
      `2: /api/anime/${encodeURIComponent(title)}/${encodeURIComponent(wiki)}`
    )
    let { data } = await axios.get(
      `/api/anime/${encodeURIComponent(title)}/${encodeURIComponent(wiki)}`
    )
    console.log(`getOpAndEd: ${JSON.stringify(data)}`)
    return data
  } catch (e) {
    console.err(e)
  }
}

const getWikiPageTitle_ByAnimeTitleYear = async (title, mal_id, year, img) => {
  //need 2 titles for the way animeThemes sets its starting year (can specify a year: 1999 or say 90s)
  console.log(`/api/animesearch/${mal_id}/${title} (${year})`)
  try {
    const { data } = await axios.get(
      `/api/animesearch/${mal_id}/${encodeURIComponent(title)} (${year})`
    )
    return data
  } catch (error) {
    //in case there's an error, search for the second way the year is formatted
    console.log(`Before year: ${year}`)
    if (parseInt(year) < 2000) {
      //get last two digits and round down to nearest 10
      year = Math.floor(parseInt(year.substring(2)) / 10) * 10
      //run api call here to get wikipage on animeThemes
    }
    console.log(`After year: ${year}`)

    // Api with 2 digit year: 90s, 80s
    try {
      const {
        data: { wikiPage },
      } = await axios.get(
        `/api/animesearch/${mal_id}/${encodeURIComponent(title)} (${year}s)`
      )
      console.log(wikiPage)
      return wikiPage
    } catch (error) {
      console.error('Opening and Endings cannot be found')
    }
  }
}

export { resultsJikanFromTitle, getWikiPageTitle_ByAnimeTitleYear, getOpAndEd }
