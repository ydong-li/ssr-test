const express = require('express')
var bodyParser = require('body-parser')
// import proxy from 'express-http-proxy'
import ssr from './ssr.js'

const app = express()
app.use(bodyParser.json());

app.use(express.static('build'))
ssr(app)

app.listen(3777)
