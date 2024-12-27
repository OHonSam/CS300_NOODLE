const Teacher = require('../models/TeacherModel');
const Section = require('../models/SectionModel');
const { mongo, default: mongoose } = require('mongoose');

class TeacherSectionController {
  // View all assigned sections
  viewAssignedSections = async (req, res) => {
    const teacherId = req.query.teacherId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
      const totalSections = await Section.countDocuments({
        teachers: teacherId
      });

      const sections = await Section.find({
        teachers: teacherId
      })

      // Get the full names of all teachers in the sections
      const teacherIds = sections.flatMap((section) => section.teachers);
      const teachers = await Teacher.find({ teacherId: { $in: teacherIds } }, 'teacherId fullName');
      console.log(teachers);
      const teacherMap = teachers.reduce((acc, teacher) => {
        acc[teacher.teacherId] = teacher.fullName;
        return acc;
      }, {});

      // Transform the data to match frontend structure
      const transformedSections = sections.map((section) => ({
        sectionId: section.sectionId,
        sectionName: section.courseName,
        teachersName: section.teachers.map((id) => teacherMap[id] || '-'),
        credits: section.courseCredit,
        year: section.schoolYear ? parseInt(section.schoolYear) : undefined,
        semester: section.semester,
        noOfStudents: section.students.length,
      }));
      
      res.json({
        totalSections,
        sections: transformedSections
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.error('Error in viewAssignedSections:', error);
    }
  };
  

  // View enrolled students of assigned section
  viewStudentsInSection = async (req, res) => {
    const sectionId = req.params.sectionId;
    try {
      const section = await Section.findById(sectionId)
        .populate({
          path: 'students',
          select: 'name studentId grade'
        });

      if (!section) {
        return res.status(404).json({ error: 'Section not found' });
      }

      res.json(section.students);
    } catch (error) {
      console.error('Error in viewStudentsInSection:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }

  calculateSectionGPA = (students) => {
    if (!students?.length) return undefined;

    const validGrades = students.filter(
      (student) => student.grade !== undefined && student.grade !== null
    );

    if (!validGrades.length) return undefined;

    const totalGPA = validGrades.reduce(
      (sum, student) => sum + (student.grade || 0),
      0
    );
    return (totalGPA / validGrades.length).toFixed(2);
  };

  calculateSectionFails = (students) => {
    if (!students?.length) return undefined;

    return students.filter(
      (student) =>
        student.grade !== undefined && student.grade !== null && student.grade < 60
    ).length;
  };
}

module.exports = new TeacherSectionController();