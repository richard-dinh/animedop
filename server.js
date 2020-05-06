const express = require('express')
const {join} = require('path')
require('dotenv').config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
// app.use(express.static(join(__dirname, 'public')))

//middleware for when heroku site is deployed. will server up files in build folder
app.use(express.static(join(__dirname, 'client', 'build')))
//bring in routes
app.use(require('./routes'))
//route to server up index.html in client folder of react
app.get('/*', (request, response) => {
  response.sendFile(join(__dirname, 'client', 'build', 'index.html'))
})
app.listen(process.env.PORT || 3001)