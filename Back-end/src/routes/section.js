const express = require('express')
const router = express.Router()
const sectionController = require('../controllers/SectionController')

router.get('/',sectionController.index)

module.exports = router