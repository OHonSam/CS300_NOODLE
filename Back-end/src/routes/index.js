// src/routes/index.js

const welcomeRouter = require('./welcome')
const siteRouter = require('./site')
const authRouter = require('./auth')

function route(app) {
  app.use('/auth', authRouter)
  app.use('/api', welcomeRouter)
  app.use('/', siteRouter)
}

module.exports = route