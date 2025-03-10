const express = require('express');
const router = express.Router();
const studentSectionController = require('../controllers/student/StudentSectionController');
const studentAnnouncementController = require('../controllers/student/StudentAnnouncementController');
const authMiddleware = require('../middleware/AuthMiddleware');

router.use(authMiddleware.verifyToken);

router.get('/sections', studentSectionController.viewEnrolledSections);
// router.get('/sections/:sectionId/teachers', studentSectionController.viewAssignedTeachers);
// router.get('/sections/:sectionId/students', studentSectionController.viewClassmates);

// router.get('/students', studentAccountController.getStudents);
// router.post('/students', studentAccountController.createStudent);
// router.put('/students/:studentId', studentAccountController.updateStudent);
// router.delete('/students/:studentId', studentAccountController.deleteStudent);

router.get('/announcements', studentAnnouncementController.getAnnouncements);

module.exports = router;
