const express = require('express');
const router = express.Router();
const adminSectionController = require('../controllers/AdminSectionController');
const studentAccountController = require('../controllers/StudentAccountController');
const teacherAccountController = require('../controllers/TeacherAccountController');
const adminAccountController = require('../controllers/AdminAccountController');
const authMiddleware = require('../middleware/AuthMiddleware');

router.use(authMiddleware.verifyToken);

// Admin section management routes
router.get('/section/statistic', adminSectionController.filterSectionsByTime);
router.get('/sections', adminSectionController.getAllSections);
router.get('/section/:schoolYear/:semester/:sectionId', adminSectionController.getSection);
router.post('/sections', adminSectionController.createSection);
router.put('/sections/:schoolYear/:semester/:sectionId', adminSectionController.updateSection);
router.delete('/sections/:schoolYear/:semester/:sectionId', adminSectionController.deleteSection);
router.get('/sections/:schoolYear/:semester/:sectionId/enrolledStudents', adminSectionController.getEnrolledStudents);
router.get('/sections/:schoolYear/:semester/:sectionId/assignedTeachers', adminSectionController.getAssignedTeachers);

// Admin account management routes
router.get('/admins', adminAccountController.getAdmins);
router.post('/admins', adminAccountController.createAdmin);
router.put('/admins/:adminId', adminAccountController.updateAdmin);
router.delete('/admins/:adminId', adminAccountController.deleteAdmin);

// Student account management routes
router.get('/students', studentAccountController.getStudents);
// router.get('/students/:studentId', studentAccountController.getStudentByStudentId);
router.post('/students', studentAccountController.createStudent);
router.put('/students/:studentId', studentAccountController.updateStudent);
router.delete('/students/:studentId', studentAccountController.deleteStudent);

// Teacher account management routes
router.get('/teachers', teacherAccountController.getTeachers);
router.post('/teachers', teacherAccountController.createTeacher);
router.put('/teachers/:teacherId', teacherAccountController.updateTeacher);
router.delete('/teachers/:teacherId', teacherAccountController.deleteTeacher);

module.exports = router;