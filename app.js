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
    if (!authKey || authKey.split(' ')[1] !== API_KEY) {
        return res.status(401).json({ error: 'Unauthorized request' })
      }
      next()
}

app.use(validateBearerToken)

function handleGetMovie (req, res){
    let retu = [...movieList]
    const {genre, country, avg_vote} = req.query

    if (genre) {
        retu = retu.filter(movie =>
          movie.genre.toLowerCase().includes(req.query.genre.toLowerCase())
        )
      }
    
      if (country) {
        retu = retu.filter(movie =>
          movie.country.toLowerCase().includes(country.toLowerCase())
        )
      }
    
      if (avg_vote) {
        retu = retu.filter(movie =>
          Number(movie.avg_vote) >= Number(avg_vote)
        )
      }
    res.json(retu)
}

app.get('/movie', handleGetMovie)

const PORT = 8080

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})