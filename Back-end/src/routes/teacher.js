const express = require('express');
const router = express.Router();
const teacherSectionController = require('../controllers/TeacherSectionController');
const teacherAccountController = require('../controllers/TeacherAccountController');
const authMiddleware = require('../middleware/AuthMiddleware');

router.use(authMiddleware.verifyToken);

// router.get('/sections', teacherSectionController.viewAssignedSections);
// router.get('/sections/:sectionId/students', teacherSectionController.viewStudentsInSection);

// router.get('/teachers', teacherAccountController.getTeachers);
// router.post('/teachers', teacherAccountController.createTeacher);
// router.put('/teachers/:teacherId', teacherAccountController.updateTeacher);
// router.delete('/teachers/:teacherId', teacherAccountController.deleteTeacher);

module.exports = router;