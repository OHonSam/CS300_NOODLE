// src/routes/index.js
const authRouter = require('./auth')
const sectionRouter = require('./section')

function route(app) {
  app.use('/auth', authRouter)
  app.use('/', sectionRouter)
}

module.exports = route