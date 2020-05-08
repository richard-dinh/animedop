const router = require('express').Router()
const {google: {youtube}} = require('googleapis')

//get a youtube video
router.get('/youtube', (req, res) => {
  //function to do a youtube search. 
  youtube('v3').search.list({
    auth: process.env.YOUTUBE,
    part: 'snippet',
    type: 'video',
    q: 'Shield Hero Ending 1'
  })
  .then( ({data : {items}}) => {
    // console.log(data)
    res.json(items)
  })
  .catch(err => {
    console.log(err)
    res.json(err)
  })
})
module.exports = router