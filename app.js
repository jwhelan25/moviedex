require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const movieList = require('./movieList')

const app = express()

const API_KEY = process.env.API_KEY


app.use(morgan('common'))
app.use(cors())
app.use(helmet())

function validateBearerToken(req, res, next){
    const authKey = req.get('Authorization')
    if(!authKey || authKey.split(' ')[0] !== 'Bearer'){
        return res.status(400).json('error: Bearer Token Needed')
    } else if (authKey !== API_KEY){
        return res.status(401).json('error: Access Denied')
    }
    next()
}

app.use(validateBearerToken)

function handleGetMovie (req, res){
    let retu = [...movieList]
    const {genre, country, avg_vote} = req.query

    res
    .json(retu)
}

app.get('/movie', handleGetMovie)

const PORT = 8080

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})