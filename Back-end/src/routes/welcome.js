const express = require('express')
const router = express.Router()
const welcomeController = require('../app/controllers/welcomeController')

router.use('/goodbye', welcomeController.getGoodbyeMessage)
router.use('/', welcomeController.getWelcomeMessage)

module.exports = router