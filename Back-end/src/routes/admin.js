// Back-end/src/routes/admin.js
const express = require('express');
const router = express.Router();
const adminSectionController = require('../controllers/AdminSectionController');
const authMiddleware = require('../middleware/AuthMiddleware');

router.use(authMiddleware.verifyToken);

router.get('/sections', adminSectionController.getAllSections);
router.post('/sections', adminSectionController.createSection);
// Add update and delete routes as needed

module.exports = router;