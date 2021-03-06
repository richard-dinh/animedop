const router = require('express').Router()
const axios = require('axios')
//bring in snoowrap
const snoowrap = require('snoowrap')

const r = new snoowrap({
  userAgent: 'test',
  clientId: process.env.CLIENTID,
  clientSecret: process.env.SECRET,
  refreshToken: process.env.REFRESHTOKEN
})

const filterWiki = (data, title) => {
  let data2 = data.split(title)[1]
  //remove all characters starting at index 0 to first \r character
  data2 = data2.substring(0, data2.indexOf('\r'))
  //remove paraentheses
  data2 = data2.replace(/\(|\)|]/g, '')
  //split string based on / 
  data2 = data2.split('/')
  return data2
}
//get all instances of a word in a search
router.get('/animesearch/:mal_id/:title', (req, res) => {
  let wikiString = ''
  let animeName = decodeURIComponent(req.params.title)
  r.getSubreddit('AnimeThemes').getWikiPage('anime_index').content_md
    .then(data => {
      //error checking for right title
      if (data.indexOf(animeName) === -1) {
        axios.get(`https://api.jikan.moe/v3/anime/${req.params.mal_id}`)
        .then( ({data: jikanData}) => {
          //check data for english title as well
          if(jikanData.title_english === null){
            //no english title (meaning no titles found)
            res.sendStatus(400)
          }
          else if(data.indexOf(jikanData.title_english) === -1) {
            //no titles found
            res.sendStatus(400)
          }
          else{
            //if english title was found instead
            wikiString = filterWiki(data, jikanData.title_english)
            res.json({ wikiPage: wikiString[wikiString.length - 1], title: jikanData.title_english })
          }
        })
        .catch(err => {
          res.sendStatus(400)
        })
      }
      else{
        //if original title was found
        wikiString = filterWiki(data, req.params.title)
        res.json({ wikiPage: wikiString[wikiString.length-1], title: null })
      }
    })
})



//get videos based on string
router.get('/anime/:title/:wiki', async (req, res) => {
  let animeName = decodeURIComponent(req.params.title)
  r.getSubreddit('AnimeThemes').getWikiPage(req.params.wiki).content_md
    .then(data => {
      //put all to lower case
      // data = data.toLowerCase()
      //strings must be in lower case
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

router.get('/test', (req, res) => {
  res.json({message: 'test'})
})

//async await test route
router.get('/test2', async (req, res) => {

  let data = await r.getSubreddit('AnimeThemes').getWikiPage('2019#wiki_tate_no_yuusha_no_nariagari').content_md
  res.json(data)
})


module.exports = router