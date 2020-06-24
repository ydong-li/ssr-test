const express = require('express')
import proxy from 'express-http-proxy'
const ssr = require('./ssr.js').default

const app = express()
app.use(express.static('build'))
ssr(app)

app.listen(3777)