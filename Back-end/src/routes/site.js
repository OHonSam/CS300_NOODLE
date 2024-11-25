const express = require('express')
const router = express.Router()
const siteController = require('../app/controllers/siteController')

router.get('/search', siteController.search)
router.get('/home', siteController.home)
router.get('/',siteController.index)

module.exports = router