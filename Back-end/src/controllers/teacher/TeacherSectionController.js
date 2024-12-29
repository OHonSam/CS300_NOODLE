const Teacher = require('../../models/TeacherModel');
const Section = require('../../models/SectionModel');

class TeacherSectionController {
  // View all assigned sections
  async viewAssignedSections(req, res) {
    const teacherId = req.query.teacherId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
      // Get total count for pagination
      const totalSections = await Section.countDocuments({
        teachers: teacherId
      });

      // Calculate total pages
      const totalPages = Math.ceil(totalSections / limit);

      // Get paginated sections
      const sections = await Section.find({
        teachers: teacherId
      })
        .skip(skip)
        .limit(limit)
        .lean(); // Using lean() for better performance since we don't need Mongoose documents

      // Get the full names of all teachers in the sections
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
        year: section.schoolYear,
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
  };

  // View enrolled students of assigned section
  async viewStudentsInSection(req, res) {
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

  calculateSectionGPA(students) {
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

  calculateSectionFails(students) {
    if (!students?.length) return undefined;

    return students.filter(
      (student) =>
        student.grade !== undefined && student.grade !== null && student.grade < 60
    ).length;
  };
}

module.exports = new TeacherSectionController();