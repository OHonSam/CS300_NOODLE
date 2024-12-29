const Teacher = require('../../models/TeacherModel');
const Section = require('../../models/SectionModel');
const ParticipationReport = require('../../models/ParticipationReportModel');

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
        courseName: section.courseName,
        teachersName: section.teachers.map((id) => teacherMap[id] || '-'),
        credits: section.courseCredit,
        schoolYear: section.schoolYear,
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

  async filterSectionsByTime(req, res) {
    const { teacherId, semester, schoolYear } = req.query;
    // console.log(teacherId, semester, schoolYear);

    try {
      const sections = await Section.find({
        schoolYear: schoolYear,
        semester: Number(semester),
        teachers: teacherId,
      });

      const sectionIds = sections.map(section => section.sectionId);

      // Fetch participation reports for the filtered sections
      const reports = await ParticipationReport.find({
        schoolYear: schoolYear,
        semester: Number(semester),
        sectionId: { $in: sectionIds },
      });

      console.log(reports)

      const uniqueTeachers = new Set(sections.flatMap(section => section.teachers)).size;
      const uniqueStudents = new Set(sections.flatMap(section => section.students)).size;

      const gradeDistribution = reports.reduce((acc, report) => {
        const grade10 = report.gradeTotal;

        if (grade10 >= 9.0) acc.A++;
        else if (grade10 >= 8.0) acc.B++;
        else if (grade10 >= 7.0) acc.C++;
        else if (grade10 >= 6.0) acc.D++;
        else if (grade10 >= 5.0) acc.E++;
        else acc.F++;

        return acc;
      }, { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 });

      const stats = {
        totalSections: sections.length,
        totalTeachers: uniqueTeachers,
        totalStudents: uniqueStudents,
        gradeDistribution: gradeDistribution
      }

      res.json({ sections, stats });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
}

module.exports = new TeacherSectionController();