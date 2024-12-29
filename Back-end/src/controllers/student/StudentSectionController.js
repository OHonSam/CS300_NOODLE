const Student = require('../../models/StudentModel');
const Teacher = require('../../models/TeacherModel');
const Section = require('../../models/SectionModel');

class StudentSectionController {
  // View all enrolled sections
  async viewEnrolledSections(req, res) {
    const studentId = req.query.studentId;
    try {
      // Get total count for pagination

      // Get paginated sections
      const sections = await Section.find({
        students: studentId
      })

      // Get the full names of all students in the sections
      const teacherIds = sections.flatMap((section) => section.teachers);
      const teachers = await Teacher.find({ teacherId: { $in: teacherIds } }, 'teacherId fullName').lean();

      const teacherMap = teachers.reduce((acc, teacher) => {
        acc[teacher.teacherId] = teacher.fullName;
        return acc;
      }, {});

      // Transform the data to match frontend structure
      const transformedSections = sections.map((section) => ({
        sectionId: section.sectionId,
        courseName: section.courseName,
        teachersName: section.teachers.map((id) => teacherMap[id] || '-'),
        credits: section.courseCredit,
        schoolYear: section.schoolYear,
        semester: section.semester,
        noOfStudents: section.students.length,
      }));

      res.json({
        sections: transformedSections,
      });
    } catch (error) {
      console.error('Error in viewAssignedSections:', error);
      res.status(500).json({
        error: error.message,
        details: 'Error occurred while fetching sections'
      });
    }
  }
}

module.exports = new StudentSectionController();