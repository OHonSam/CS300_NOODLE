const mongoose = require('mongoose');
const Section = require('../../models/SectionModel');
const Student = require('../../models/StudentModel');
const Teacher = require('../../models/TeacherModel');
const ParticipationReport = require('../../models/ParticipationReportModel');

class AdminSectionController {
  async getAllSections(req, res) {
    const { page = 1, limit = 10 } = req.query;
    try {
      const sections = await Section.find()
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

      const totalSections = await Section.countDocuments();

      res.json({
        sections,
        totalPages: Math.ceil(totalSections / limit),
      });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }

  async filterSectionsByTime(req, res) {
    const { semester, schoolYear } = req.query;

    try {
      const sections = await Section.find({ 
        schoolYear: schoolYear, 
        semester: Number(semester) 
      });
      
      const reports = await ParticipationReport.find({ 
        schoolYear: schoolYear, 
        semester: Number(semester) 
      });

      const uniqueTeachers = new Set(sections.flatMap(section => section.teachers)).size;
      const uniqueStudents = new Set(sections.flatMap(section => section.students)).size;

      const gradeDistribution = reports.reduce((acc, report) => {
        const grade10 = report.grade10;

        if (grade10 >= 9.0) acc.A++;
        else if (grade10 >= 8.0) acc.B++;
        else if (grade10 >= 7.0) acc.C++;
        else if (grade10 >= 6.0) acc.D++;
        else acc.F++;

        return acc;
      }, { A: 0, B: 0, C: 0, D: 0, F: 0 });
      
      console.log(gradeDistribution);

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

  async getSection(req, res) {
    const { sectionId, schoolYear, semester } = req.params;
    try {
      const section = await Section.findOne({
        sectionId: sectionId,
        schoolYear: schoolYear,
        semester: Number(semester)
      });

      if (!section) {
        return res.status(404).json({ message: 'Section not found' });
      }

      res.json(section);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }

  async getParticipationReports(req, res) {
    const { schoolYear, semester } = req.query;

    try {
      const reports = await ParticipationReport.find({ schoolYear, semester });
      res.json(reports);
    } catch (error) {
      res.status(500).json({ error: 'Server error', message: error.message });
    }
  }

  async createSection(req, res) {
    try {
      const newSection = new Section(req.body);
      await newSection.save();
      res.status(201).json(newSection);
    } catch (error) {
      // Duplicate account error
      if (error.code === 11000) {
        res.status(400).json({
          error: 'Bad request',
          message: 'Section existed already!',
        });
      } else {
        res.status(500).json({
          error: 'Server error',
          message: error.message,
        });
      }
    }
  }

  async updateSection(req, res) {
    const { sectionId, schoolYear, semester } = req.params;
    const updateData = req.body;

    try {
      const updatedSection = await Section.findOneAndUpdate(
        {
          sectionId: sectionId,
          schoolYear: schoolYear,
          semester: Number(semester)
        },
        { $set: updateData },
        {
          new: true,
          runValidators: true
        }
      );

      if (!updatedSection) {
        return res.status(404).json({
          message: 'Section not found'
        });
      }

      res.json(updatedSection);
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).json({
          error: 'Bad request',
          message: 'Section existed already!',
        });
      } else {
        res.status(500).json({
          error: 'Server error',
          message: error.message
        });
      }
    }
  }

  async deleteSection(req, res) {
    const { sectionId, schoolYear, semester } = req.params;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const deletedSection = await Section.findOneAndDelete(
        {
          sectionId: sectionId,
          schoolYear: schoolYear,
          semester: Number(semester)
        },
        { session }
      );

      if (!deletedSection) {
        await session.abortTransaction();
        return res.status(404).json({ error: 'Section not found' });
      }

      await session.commitTransaction();

      res.json({
        message: 'Section deleted successfully!',
        deletedSection
      });
    } catch (error) {
      if (session.inTransaction()) {
        await session.abortTransaction();
      }
      console.error('Delete section error:', error);
      res.status(500).json({
        error: 'Server error',
        message: error.message
      });
    } finally {
      session.endSession();
    }
  }

  async getEnrolledStudents(req, res) {
    const { sectionId, schoolYear, semester } = req.params;

    try {
      const section = await Section.findOne({
        sectionId: sectionId,
        schoolYear: schoolYear,
        semester: Number(semester)
      });

      if (!section) {
        return res.status(404).json({ message: 'Section not found' });
      }

      const studentIds = section.students;
      const students = await Student.find({ studentId: { $in: studentIds } });
      
      res.json(students);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }

  async getAssignedTeachers(req, res) { 
    const { sectionId, schoolYear, semester } = req.params;
    console.log(sectionId, schoolYear, semester);
    try {
      const section = await Section.findOne({
        sectionId: sectionId,
        schoolYear: schoolYear,
        semester: Number(semester)
      });

      if (!section) {
        return res.status(404).json({ message: 'Section not found' });
      }

      const teacherIds = section.teachers;
      const teachers = await Teacher.find({ teacherId: { $in: teacherIds } });

      res.json(teachers);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }

  async removeStudentFromSection(req, res) {
    const { sectionId, schoolYear, semester, studentId } = req.params;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const updatedSection = await Section.findOneAndUpdate(
        {
          sectionId: sectionId,
          schoolYear: schoolYear,
          semester: Number(semester)
        },
        { $pull: { students: studentId } },
        {
          new: true,
          runValidators: true,
          session
        }
      );

      if (!updatedSection) {
        await session.abortTransaction();
        return res.status(404).json({ message: 'Section not found' });
      }

      await session.commitTransaction();

      res.json(updatedSection);
    } catch (error) {
      if (session.inTransaction()) {
        await session.abortTransaction();
      }
      console.error('Remove student from section error:', error);
      res.status(500).json({
        error: 'Server error',
        message: error.message
      });
    } finally {
      session.endSession();
    }
  }

  async removeTeacherFromSection(req, res) {
    const { sectionId, schoolYear, semester, teacherId } = req.params;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const updatedSection = await Section.findOneAndUpdate(
        {
          sectionId: sectionId,
          schoolYear: schoolYear,
          semester: Number(semester)
        },
        { $pull: { teachers: teacherId } },
        {
          new: true,
          runValidators: true,
          session
        }
      );

      if (!updatedSection) {
        await session.abortTransaction();
        return res.status(404).json({ message: 'Section not found' });
      }

      await session.commitTransaction();

      res.json(updatedSection);
    } catch (error) {
      if (session.inTransaction()) {
        await session.abortTransaction();
      }
      console.error('Remove teacher from section error:', error);
      res.status(500).json({
        error: 'Server error',
        message: error.message
      });
    } finally {
      session.endSession();
    }
  }
}

module.exports = new AdminSectionController();
