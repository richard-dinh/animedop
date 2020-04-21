const express = require('express')
const {join} = require('path')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(join(__dirname, 'public')))


const snoowrap = require('snoowrap')

const r = new snoowrap({
  userAgent: 'test',
  clientId: 'O31LPOU1GG6mMQ',
  clientSecret: 'kum4bqKZDiIIPPx_S2Emlf-AvPQ',
  refreshToken: '31646591-6tlCeQZyIo4cZfWUZDGfkd8li3k'
})

//get all instances of a word in a search
app.get('/animesearch', (req, res) => {
  r.getSubreddit('AnimeThemes').getWikiPage('anime_index').content_md
  .then( data => {
    res.json({data})
  })
})



//get videos based on string
app.get('/anime', (req, res) => {
  r.getSubreddit('AnimeThemes').getWikiPage('2018#wiki_zombieland_saga').content_md
  .then( data => {
    //put all to lower case
    data = data.toLowerCase()
    // console.log(data.indexOf('zombieland'))
    // console.log(data.indexOf('###', data.indexOf('zombieland')))
    let data2 = data.slice(data.indexOf('zombieland'), data.indexOf('###', data.indexOf('zombieland')) )
    res.json(data2)
  })
})




app.listen(3000)