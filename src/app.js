require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const {NODE_ENV} = require('/.config')
const validateBearerToken = require('./validate-bearer-token')
const bookmarksRouter = require('./bookmarks/bookmarks-router')
const errorHandler = require('./errorHandler')

const app = express()

const morganOption = (NODE_ENV === 'production')
    ? 'tiny'
    : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

app.use(validateBearerToken)
app.use(bookmarksRouter)

app.get('/', (req, res) => {
    res
        .send('Hello World!')
})

app.use(errorHandler)

module.exports = app