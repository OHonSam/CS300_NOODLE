const express = require('express')
const router = express.Router()
const welcomeController = require('../app/controllers/welcomeController')

router.get('/goodbye', welcomeController.getGoodbyeMessage)
router.get('/', welcomeController.getWelcomeMessage)

module.exports = router