require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const movieList = require('./movieList')
const cors = require('cors')
const helmet = require('helmet')

const app = express()

const API_KEY = process.env.API_KEY



app.use(morgan('common'))
app.use(helmet())
app.use(cors())

