// src/app.js
const express = require('express')
const morgan = require('morgan')
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
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

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