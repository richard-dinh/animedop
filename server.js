const express = require('express')
const {join} = require('path')
require('dotenv').config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(join(__dirname, 'public')))

//bring in routes
app.use(require('./routes'))

app.listen(process.env.PORT || 3001)