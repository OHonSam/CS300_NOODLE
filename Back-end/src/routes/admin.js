// Back-end/src/routes/admin.js
const express = require('express');
const router = express.Router();
const adminSectionController = require('../controllers/AdminSectionController');
const adminAccountController = require('../controllers/AdminAccountController');
const authMiddleware = require('../middleware/AuthMiddleware');

router.use(authMiddleware.verifyToken);

// router.get('/sections', adminSectionController.getAllSections);
// router.post('/sections', adminSectionController.createSection);
// Add update and delete routes as needed

// Admin account management routes
router.get('/admins', adminAccountController.getAdmins);
router.post('/admins', adminAccountController.createAdmin);
router.put('/admins/:adminId', adminAccountController.updateAdmin);
router.delete('/admins/:adminId', adminAccountController.deleteAdmin);

module.exports = router;