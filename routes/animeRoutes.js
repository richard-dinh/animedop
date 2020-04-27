const router = require('express').Router()

//bring in snoowrap
const snoowrap = require('snoowrap')

const r = new snoowrap({
  userAgent: 'test',
  clientId: 'O31LPOU1GG6mMQ',
  clientSecret: 'kum4bqKZDiIIPPx_S2Emlf-AvPQ',
  refreshToken: '31646591-6tlCeQZyIo4cZfWUZDGfkd8li3k'
})

//get all instances of a word in a search
router.get('/animesearch', (req, res) => {
  r.getSubreddit('AnimeThemes').getWikiPage('anime_index').content_md
    .then(data => {
      res.json({ data })
    })
})



//get videos based on string
router.get('/anime', (req, res) => {
  r.getSubreddit('AnimeThemes').getWikiPage('90s#wiki_yu.2606gi.2606oh.21').content_md
    .then(data => {
      //put all to lower case
      data = data.toLowerCase()
      //strings must be in lower case
      let data2 = data.slice(data.indexOf('yu☆gi☆oh'), data.indexOf('###', data.indexOf('yu☆gi☆oh')))
      let arr = data2.split(/\r\n/g)
      // console.log(arr)
      let arr2 = []
      for(let i = 0; i< arr.length; i++){
        //getting the myanimelist link and returning it as the first obj in arr2
        if(i === 0) {
          let temp = arr[i].split(']')
          let obj = {
            name: temp[0],
            //remove all ( and ) characters in the string
            mal: temp[1].replace(/\(|\)/g, '')
          }
          arr2.push(obj)
        }
        else{
          let firstTwo = arr[i].substring(0, 2)
          //if first two characters of the string are op or ed
          if(firstTwo === 'op' || firstTwo === 'ed'){
            // splitting this way makes it so that:
            // index 0 = op/ed number, index 1 = name of song, index 5 = link to song, index 6 specifies the episodes
            let temp = arr[i].split(/"|\[|\]|\|/)
            let obj = {
              number: temp[0],
              title: temp[1],
              link: temp[5].replace(/\(|\)/g, ''),
              episode: temp[6]
            }
            arr2.push(obj)
            // console.log(arr[i])
          }
        }
      }
      res.json({arr, arr2})
    })
})

module.exports = router