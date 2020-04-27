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
  r.getSubreddit('AnimeThemes').getWikiPage('2018#wiki_zombieland_saga').content_md
    .then(data => {
      //put all to lower case
      data = data.toLowerCase()
      // console.log(data.indexOf('zombieland'))
      // console.log(data.indexOf('###', data.indexOf('zombieland')))
      let data2 = data.slice(data.indexOf('zombieland'), data.indexOf('###', data.indexOf('zombieland')))
      let arr = data2.split(/\r\n/g)
      // console.log(arr)
      let arr2 = []
      for(let i = 0; i< arr.length; i++){
        //getting the myanimelist link
        if(i === 0) {
          let temp = arr[i].split(']')
          console.log(temp[0])
          console.log(temp[1].replace(/\(|\)/g, ''))
          let obj = {
            name: temp[0],
            //remove all ( and ) characters in the string
            mal: temp[1].replace(/\(|\)/g, '')
          }
          arr2.push(obj)
        }
      }
      res.json({arr, arr2})
    })
})

module.exports = router