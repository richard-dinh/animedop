const express = require('express')
const {join} = require('path')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(join(__dirname, 'public')))

//bring in routes
app.use(require('./routes'))

app.listen(3000)