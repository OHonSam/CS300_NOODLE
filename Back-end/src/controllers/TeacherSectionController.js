const Teacher = require('../models/TeacherModel');
const Section = require('../models/SectionModel');

class TeacherSectionController {
  // View all assigned sections
  async viewAssignedSections(req, res) {
    const teacherId = req.user.id;
    try {
      const teacher = await Teacher.findById(teacherId).populate('sections');
      res.json(teacher.sections);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }

  // View enrolled students of assigned sections
  async viewStudentsInSection(req, res) {
    const sectionId = req.params.sectionId;
    try {
      const section = await Section.findById(sectionId).populate('students');
      res.json(section.students);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
}

module.exports = new TeacherSectionController();