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
router.get('/animesearch/:title', (req, res) => {
  r.getSubreddit('AnimeThemes').getWikiPage('anime_index').content_md
    .then(data => {
      //error checking for right title
      if (data.indexOf(req.params.title) === -1) {
        res.sendStatus(400)
      }
      else{
        let data2 = data.split(req.params.title)[1]
        //remove all characters starting at index 0 to first \r character
        data2 = data2.substring(0, data2.indexOf('\r'))
        //remove paraentheses
        data2 = data2.replace(/\(|\)|]/g, '')
        //split string based on / 
        data2 = data2.split('/')
        //return only last index of array
        res.json({ wikiPage: data2[data2.length-1] })
      }
    })
})



//get videos based on string
router.get('/anime/:title/:wiki', (req, res) => {
  r.getSubreddit('AnimeThemes').getWikiPage(req.params.wiki).content_md
    .then(data => {
      //put all to lower case
      // data = data.toLowerCase()
      //strings must be in lower case
      let animeName = req.params.title
      // animeName = animeName.toLocaleLowerCase()
      let data2 = data.slice(data.indexOf(animeName), data.indexOf('###', data.indexOf(animeName)))
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
          if(firstTwo === 'OP' || firstTwo === 'ED'){
            // splitting this way makes it so that:
            // index 0 = op/ed number, index 1 = name of song, index 5 = link to song, index 6 specifies the episodes
            let temp = arr[i].split(/"|\[|\]|\|/)
            // console.log(arr[i])
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
      res.json(arr2)
    })
})

module.exports = router