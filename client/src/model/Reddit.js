import React from 'react'
import axios from 'axios'

const resultsJikanFromTitle = (title) => {
  return axios
    .get(`https://api.jikan.moe/v3/search/anime?q=${title}&limit=30`)
    .then(({ data: { results } }) => {
      return results
    })
    .catch((err) => console.error(err))
}

//function to get Op and Endings
const getOpAndEd = (wiki, title, img) => {
  console.log(
    `api/anime/${encodeURIComponent(title)}/${encodeURIComponent(wiki)}`
  )
  return axios
    .get(`api/anime/${encodeURIComponent(title)}/${encodeURIComponent(wiki)}`)
    .then(({ data }) => {
      return data
      //   //clear out results field
      //   document.getElementById('results').innerHTML = ''
      //   let animeNode = document.createElement('div')
      //   animeNode.setAttribute('class', 'card col-md-12')
      //   animeNode.innerHTML = `
      //   <img src="${img}" class="card-img-top imgStyle" alt="${title}">
      //   <div class="card-body">
      //     <h5 class="card-title">${title}</h5>
      //   </div>
      //   <ul class="list-group list-group-flush accordion">
      //   ${generateList(data)}
      //   </ul>
      // `
      //   document.getElementById('results').append(animeNode)
    })
    .catch((err) => console.error(err))
}

const songsByAnimeTitleYear = (title, mal_id, year, img) => {
  //need 2 titles for the way animeThemes sets its starting year (can specify a year: 1999 or say 90s)
  console.log(`/api/animesearch/${mal_id}/${title} (${year})`)
  return (
    axios
      .get(`/api/animesearch/${mal_id}/${encodeURIComponent(title)} (${year})`)
      // .then(async ({ data: { wikiPage } }) => {
      //   console.log(wikiPage)
      //   var x = await getOpAndEd(wikiPage, title ? title : title, img)
      //   return x
      .then(async ({ data: { wikiPage } }) => {
        console.log(wikiPage)
        return wikiPage
        //var x = await getOpAndEd(wikiPage, title ? title : title, img)
        //return x
      })
      .catch((err) => {
        //in case there's an error, search for the second way the year is formatted
        console.log(year)
        if (parseInt(year) < 2000) {
          //get last two digits and round down to nearest 10
          year = Math.floor(parseInt(year.substring(2)) / 10) * 10
          // console.log(`${parent.dataset.title} (${year}s)`)
          //run api call here to get wikipage on animeThemes
        }
        console.log(year)
        axios
          .get(
            `/api/animesearch/${mal_id}/${encodeURIComponent(title)} (${year}s)`
          )
          .then(({ data: { wikiPage } }) => {
            console.log(wikiPage)
            getOpAndEd(wikiPage, title ? title : title, img)
          })
          .catch((err) => {
            console.error('Opening and Endings cannot be found')
          })
      })
      .then((wikiPage) => {
        console.log(wikiPage)
        return getOpAndEd(wikiPage, title ? title : title, img)
      })
  )
}

// const songsByAnimeTitleYear = (title, mal_id, year, img) => {
//   //need 2 titles for the way animeThemes sets its starting year (can specify a year: 1999 or say 90s)
//   console.log(`/api/animesearch/${mal_id}/${title} (${year})`)
//   return (
//     axios
//       .get(`/api/animesearch/${mal_id}/${encodeURIComponent(title)} (${year})`)
//       // .then(async ({ data: { wikiPage } }) => {
//       //   console.log(wikiPage)
//       //   var x = await getOpAndEd(wikiPage, title ? title : title, img)
//       //   return x
//       .then(async ({ data: { wikiPage } }) => {
//         console.log(wikiPage)
//         var x = await getOpAndEd(wikiPage, title ? title : title, img)
//         return x
//       })
//       .catch((err) => {
//         //in case there's an error, search for the second way the year is formatted
//         console.log(year)
//         if (parseInt(year) < 2000) {
//           //get last two digits and round down to nearest 10
//           year = Math.floor(parseInt(year.substring(2)) / 10) * 10
//           // console.log(`${parent.dataset.title} (${year}s)`)
//           //run api call here to get wikipage on animeThemes
//         }
//         console.log(year)
//         axios
//           .get(
//             `/api/animesearch/${mal_id}/${encodeURIComponent(title)} (${year}s)`
//           )
//           .then(({ data: { wikiPage } }) => {
//             console.log(wikiPage)
//             getOpAndEd(wikiPage, title ? title : title, img)
//           })
//           .catch((err) => {
//             console.error('Opening and Endings cannot be found')
//           })
//       })
//   )
// }

export { resultsJikanFromTitle, songsByAnimeTitleYear }
