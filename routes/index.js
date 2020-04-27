const router = require('express').Router()

router.use('/api', require('./animeRoutes.js'))

module.exports = router