const Student = require('../models/StudentModel');
const Section = require('../models/SectionModel');

class StudentSectionController {
  // View all enrolled sections
  async viewEnrolledSections(req, res) {
    const studentId = req.user.id;
    try {
      const student = await Student.findById(studentId).populate('sections');
      res.json(student.sections);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }

  // View assigned teachers of enrolled sections
  async viewAssignedTeachers(req, res) {
    const studentId = req.user.id;
    try {
      const student = await Student.findById(studentId).populate({
        path: 'sections',
        populate: { path: 'teacher' },
      });
      const teachers = student.sections.map(section => section.teacher);
      res.json(teachers);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }

  // View enrolled students in the same section
  async viewClassmates(req, res) {
    const sectionId = req.params.sectionId;
    try {
      const section = await Section.findById(sectionId).populate('students');
      res.json(section.students);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
}

module.exports = new StudentSectionController();