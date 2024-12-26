const express = require('express');
const router = express.Router();
const adminSectionController = require('../controllers/AdminSectionController');
const studentAccountController = require('../controllers/StudentAccountController');
const teacherAccountController = require('../controllers/TeacherAccountController');
const adminAccountController = require('../controllers/AdminAccountController');
const authMiddleware = require('../middleware/AuthMiddleware');

router.use(authMiddleware.verifyToken);

router.get('/sections', adminSectionController.getSections);
router.post('/sections', adminSectionController.createSection);

// Admin account management routes
router.get('/admins', adminAccountController.getAdmins);
router.post('/admins', adminAccountController.createAdmin);
router.put('/admins/:adminId', adminAccountController.updateAdmin);
router.delete('/admins/:adminId', adminAccountController.deleteAdmin);

// Student account management routes
router.get('/students', studentAccountController.getStudents);
router.post('/students', studentAccountController.createStudent);
router.put('/students/:studentId', studentAccountController.updateStudent);
router.delete('/students/:studentId', studentAccountController.deleteStudent);

// Teacher account management routes
router.get('/teachers', teacherAccountController.getTeachers);
router.post('/teachers', teacherAccountController.createTeacher);
router.put('/teachers/:teacherId', teacherAccountController.updateTeacher);
router.delete('/teachers/:teacherId', teacherAccountController.deleteTeacher);

module.exports = router;