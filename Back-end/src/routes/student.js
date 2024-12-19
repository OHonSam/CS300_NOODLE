const express = require('express');
const router = express.Router();
const studentSectionController = require('../controllers/StudentSectionController');
const studentAccountController = require('../controllers/StudentAccountController');
const authMiddleware = require('../middleware/AuthMiddleware');

router.use(authMiddleware.verifyToken);

// router.get('/sections', studentSectionController.viewEnrolledSections);
// router.get('/sections/:sectionId/teachers', studentSectionController.viewAssignedTeachers);
// router.get('/sections/:sectionId/students', studentSectionController.viewClassmates);

// router.get('/students', studentAccountController.getStudents);
// router.post('/students', studentAccountController.createStudent);
// router.put('/students/:studentId', studentAccountController.updateStudent);
// router.delete('/students/:studentId', studentAccountController.deleteStudent);

module.exports = router;