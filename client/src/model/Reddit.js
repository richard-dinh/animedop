import React from 'react'
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

//function to get Op and Endings
const getOpAndEd = async (wiki, title, img) => {
  try {
    console.log(
      `2: /api/anime/${encodeURIComponent(title)}/${encodeURIComponent(wiki)}`
    )
    let { data } = await axios.get(
      `/api/anime/${encodeURIComponent(title)}/${encodeURIComponent(wiki)}`
    )
    console.log(`getOpAndEd: data - ${JSON.stringify(data)}`)
    return data
  } catch (error) {
    console.log('11111111111111111111111  EROORORR')
    console.log(error.message)
  }
}

// const getOpAndEd = (wiki, title, img) => {
//   console.log(
//     `api/anime/${encodeURIComponent(title)}/${encodeURIComponent(wiki)}`
//   )
//   return axios
//     .get(`api/anime/${encodeURIComponent(title)}/${encodeURIComponent(wiki)}`)
//     .then(({ data }) => {
//       return data
//       //   //clear out results field
//       //   document.getElementById('results').innerHTML = ''
//       //   let animeNode = document.createElement('div')
//       //   animeNode.setAttribute('class', 'card col-md-12')
//       //   animeNode.innerHTML = `
//       //   <img src="${img}" class="card-img-top imgStyle" alt="${title}">
//       //   <div class="card-body">
//       //     <h5 class="card-title">${title}</h5>
//       //   </div>
//       //   <ul class="list-group list-group-flush accordion">
//       //   ${generateList(data)}
//       //   </ul>
//       // `
//       //   document.getElementById('results').append(animeNode)
//     })
//     .catch((err) => console.error(err))
// }

// const songsByAnimeTitleYear = (title, mal_id, year, img) => {
//   //need 2 titles for the way animeThemes sets its starting year (can specify a year: 1999 or say 90s)
//   console.log(`/api/animesearch/${mal_id}/${title} (${year})`)
//   return axios
//     .get(`/api/animesearch/${mal_id}/${encodeURIComponent(title)} (${year})`)
//     .then(async ({ data: { wikiPage } }) => {
//       console.log('wiki: ' + wikiPage)
//       try {
//         return await getOpAndEd(wikiPage, title ? title : title, img)
//       } catch (e) {
//         console.err(e)
//       }

//       // .then(({ data: { wikiPage } }) => {
//       //   console.log(wikiPage)
//       //   return wikiPage
//       //return getOpAndEd(wikiPage, title ? title : title, img)
//       //var x = await getOpAndEd(wikiPage, title ? title : title, img)
//       //return x
//     })
//     .catch((err) => {
//       //in case there's an error, search for the second way the year is formatted
//       console.log(year)
//       if (parseInt(year) < 2000) {
//         //get last two digits and round down to nearest 10
//         year = Math.floor(parseInt(year.substring(2)) / 10) * 10
//         // console.log(`${parent.dataset.title} (${year}s)`)
//         //run api call here to get wikipage on animeThemes
//       }
//       console.log(year)
//       axios
//         .get(
//           `/api/animesearch/${mal_id}/${encodeURIComponent(title)} (${year}s)`
//         )
//         .then(({ data: { wikiPage } }) => {
//           console.log(wikiPage)
//           getOpAndEd(wikiPage, title ? title : title, img)
//         })
//         .catch((err) => {
//           console.error('Opening and Endings cannot be found')
//         })
//     })
//   // .then((wikiPage) => {
//   //   console.log(wikiPage)
//   //   return getOpAndEd(wikiPage, title ? title : title, img)
//   // })
// }

// Good
const songsByAnimeTitleYear2 = async (title, mal_id, year, img) => {
  //need 2 titles for the way animeThemes sets its starting year (can specify a year: 1999 or say 90s)
  console.log(`1: /api/animesearch/${mal_id}/${title} (${year})`)
  const {
    data: { wikiPage },
  } = await axios.get(
    `/api/animesearch/${mal_id}/${encodeURIComponent(title)} (${year})`
  )
  return wikiPage
}

const songsByAnimeTitleYear = async (title, mal_id, year, img) => {
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

const songsByAnimeTitleYearBackup = async (title, mal_id, year, img) => {
  //need 2 titles for the way animeThemes sets its starting year (can specify a year: 1999 or say 90s)
  console.log(`/api/animesearch/${mal_id}/${title} (${year})`)
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

export {
  resultsJikanFromTitle,
  songsByAnimeTitleYear,
  getOpAndEd,
  songsByAnimeTitleYearBackup,
}
