// src/app.js
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const route  = require('./routes/index')
const db = require('./config/db')
const dotenv = require('dotenv');
dotenv.config({ path:'./.env'});
const app = express()
const port = process.env.PORT

db.connect()

// Middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// CORS middleware
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}));

route(app)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something broke!' })
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

module.exports = app