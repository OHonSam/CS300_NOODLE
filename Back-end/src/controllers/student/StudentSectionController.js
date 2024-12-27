const Student = require('../../models/StudentModel');
const Teacher = require('../../models/TeacherModel');
const Section = require('../../models/SectionModel');

class StudentSectionController {
  // View all enrolled sections
  async viewEnrolledSections(req, res) {
    const studentId = req.query.studentId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
      // Get total count for pagination
      const totalSections = await Section.countDocuments({
        students: studentId
      });

      // Calculate total pages
      const totalPages = Math.ceil(totalSections / limit);

      // Get paginated sections
      const sections = await Section.find({
        students: studentId
      })
        .skip(skip)
        .limit(limit)
        .lean(); // Using lean() for better performance since we don't need Mongoose documents

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
        sectionName: section.courseName,
        teachersName: section.teachers.map((id) => teacherMap[id] || '-'),
        credits: section.courseCredit,
        year: section.schoolYear ? parseInt(section.schoolYear) : undefined,
        semester: section.semester,
        noOfStudents: section.students.length,
      }));
      
      res.json({
        currentPage: page,
        totalPages,
        totalSections,
        sections: transformedSections,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
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