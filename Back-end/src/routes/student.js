const express = require('express');
const router = express.Router();
const studentSectionController = require('../controllers/StudentSectionController');
const authMiddleware = require('../middleware/AuthMiddleware');

router.use(authMiddleware.verifyToken);

router.get('/sections', studentSectionController.viewEnrolledSections);
router.get('/sections/:sectionId/teachers', studentSectionController.viewAssignedTeachers);
router.get('/sections/:sectionId/students', studentSectionController.viewClassmates);

module.exports = router;