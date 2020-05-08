const router = require('express').Router()

router.use('/api', require('./animeRoutes.js'))
router.use('/api', require('./youtubeRoutes.js'))

module.exports = router