const express = require('express');
const router = express.Router();
const teacherSectionController = require('../controllers/TeacherSectionController');
const authMiddleware = require('../middleware/AuthMiddleware');

router.use(authMiddleware.verifyToken);

router.get('/sections', teacherSectionController.viewAssignedSections);
router.get('/sections/:sectionId/students', teacherSectionController.viewStudentsInSection);

module.exports = router;