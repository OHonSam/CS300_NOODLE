const express = require('express');
const router = express.Router();
const adminSectionController = require('../controllers/admin/AdminSectionController');
const studentAccountController = require('../controllers/admin/StudentAccountController');
const teacherAccountController = require('../controllers/admin/TeacherAccountController');
const adminAccountController = require('../controllers/admin/AdminAccountController');
const authMiddleware = require('../middleware/AuthMiddleware');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.use(authMiddleware.verifyToken);

// Admin section management routes
router.get('/section/statistic', adminSectionController.filterSectionsByTime);
router.get('/section/participation/report', adminSectionController.getParticipationReports);
router.get('/sections', adminSectionController.getAllSections);
router.get('/section/:schoolYear/:semester/:sectionId', adminSectionController.getSection);
router.get('/sections/:schoolYear/:semester/:sectionId/enrolledStudents', adminSectionController.getEnrolledStudents);
router.get('/sections/:schoolYear/:semester/:sectionId/assignedTeachers', adminSectionController.getAssignedTeachers);
router.post('/sections', adminSectionController.createSection);
router.post('/sections/:schoolYear/:semester/:sectionId/enrollStudents', upload.single('file'), adminSectionController.addEnrolledStudentsFromFile);
router.put('/sections/:schoolYear/:semester/:sectionId', adminSectionController.updateSection);
router.delete('/sections/:schoolYear/:semester/:sectionId', adminSectionController.deleteSection);
router.delete('/sections/:schoolYear/:semester/:sectionId/removeEnrolled/:studentId/', adminSectionController.removeStudentFromSection);
router.delete('/sections/:schoolYear/:semester/:sectionId/removeAssigned/:teacherId', adminSectionController.removeTeacherFromSection);

// Admin account management routes
router.get('/admins', adminAccountController.getAdmins);
router.post('/fileAdmins', upload.single('file'), adminAccountController.addAdminsFromFile);
router.post('/admins', adminAccountController.createAdmin);
router.put('/admins/:adminId', adminAccountController.updateAdmin);
router.delete('/admins/:adminId', adminAccountController.deleteAdmin);

// Student account management routes
router.get('/students', studentAccountController.getStudents);
router.post('/fileStudents', upload.single('file'), studentAccountController.addStudentsFromFile);
router.post('/students', studentAccountController.createStudent);
router.put('/students/:studentId', studentAccountController.updateStudent);
router.delete('/students/:studentId', studentAccountController.deleteStudent);

// Teacher account management routes
router.get('/teachers', teacherAccountController.getTeachers);
router.post('/fileTeachers', upload.single('file'), teacherAccountController.addTeachersFromFile);
router.post('/teachers', teacherAccountController.createTeacher);
router.put('/teachers/:teacherId', teacherAccountController.updateTeacher);
router.delete('/teachers/:teacherId', teacherAccountController.deleteTeacher);

module.exports = router;