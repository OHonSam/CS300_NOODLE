// src/routes/index.js

const welcomeRouter = require('./welcome')
const siteRouter = require('./site')

function route(app) {
  app.use('/api', welcomeRouter)

  app.use('/', siteRouter)
}

module.exports = route