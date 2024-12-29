const mongoose = require('mongoose');
const Section = require('../../models/SectionModel');
const Student = require('../../models/StudentModel');
const Teacher = require('../../models/TeacherModel');
const ParticipationReport = require('../../models/ParticipationReportModel');
const { FileProcessingUtil, BulkUserCreationUtil } = require('../../utils/FileProcessing');


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
        const grade10 = report.gradeTotal;

        if (grade10 >= 9.0) acc.A++;
        else if (grade10 >= 8.0) acc.B++;
        else if (grade10 >= 7.0) acc.C++;
        else if (grade10 >= 6.0) acc.D++;
        else if (grade10 >= 5.0) acc.E++;
        else acc.F++;

        return acc;
      }, { A: 0, B: 0, C: 0, D: 0, E:0, F: 0 });
      
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

  async updateEnrolledStudent(req, res) {
    const { sectionId, schoolYear, semester, studentId } = req.params;
    const updateData = req.body;
    
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      // Update student basic info
      const updatedStudent = await Student.findOneAndUpdate(
        { studentId: studentId },
        { 
          fullName: updateData.fullName,
          email: updateData.email,
          gender: updateData.gender,
          dob: updateData.dob,
          class: updateData.class,
          phone: updateData.phone,
          address: updateData.address
        },
        {
          new: true,
          runValidators: true,
          session
        }
      );
  
      if (!updatedStudent) {
        await session.abortTransaction();
        return res.status(404).json({ message: 'Student not found' });
      }
  
      // Update participation report grades
      const updatedReport = await ParticipationReport.findOneAndUpdate(
        {
          studentId: studentId,
          sectionId: sectionId,
          schoolYear: schoolYear,
          semester: Number(semester)
        },
        {
          gradeMidterm: updateData.gradeMidterm,
          gradeFinal: updateData.gradeFinal,
          gradeOthers: updateData.gradeOthers,
          gradeTotal: updateData.gradeTotal
        },
        {
          new: true,
          runValidators: true,
          session
        }
      );
  
      if (!updatedReport) {
        await session.abortTransaction();
        return res.status(404).json({ message: 'Participation report not found' });
      }
  
      await session.commitTransaction();
  
      // Combine student info with grades
      const response = {
        ...updatedStudent.toObject(),
        gradeMidterm: updatedReport.gradeMidterm,
        gradeFinal: updatedReport.gradeFinal,
        gradeOthers: updatedReport.gradeOthers,
        gradeTotal: updatedReport.gradeTotal
      };
  
      res.json(response);
    } catch (error) {
      await session.abortTransaction();
      res.status(500).json({
        error: 'Server error',
        message: error.message
      });
    } finally {
      session.endSession();
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

      // Delete all associated ParticipationReports within the same transaction
      await ParticipationReport.deleteMany(
        {
          sectionId: sectionId,
          schoolYear: schoolYear,
          semester: Number(semester)
        },
        { session }
      );

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

      // Get both student info and their participation reports
      const [students, reports] = await Promise.all([
        Student.find({ studentId: { $in: studentIds } }),
        ParticipationReport.find({
          studentId: { $in: studentIds },
          sectionId: sectionId,
          schoolYear: schoolYear,
          semester: Number(semester)
        })
      ]);
      
      // Combine student info with their grades
      const studentsWithReport = students.map(student => {
        const report = reports.find(r => r.studentId === student.studentId) || {};
        return {
          ...student.toObject(),
          gradeMidterm: report.gradeMidterm || 0,
          gradeFinal: report.gradeFinal || 0,
          gradeOthers: report.gradeOthers || 0,
          gradeTotal: report.gradeTotal || 0
        };
      });

      console.log(studentsWithReport)

      res.json(studentsWithReport);
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

      // Delete associated participation report
      await ParticipationReport.findOneAndDelete(
        { sectionId: sectionId, schoolYear: schoolYear, semester: Number(semester), studentId: studentId },
        { session }
      );

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

  async assignTeacherToSection(req, res) {
    const { sectionId, schoolYear, semester, teacherId } = req.params;
    
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      // Find section and validate
      const section = await Section.findOne(
        {
        sectionId: sectionId,
        schoolYear: schoolYear,
        semester: Number(semester)
        },
        { session }
      );
      
      console.log(section)

      if (!section) {
        await session.abortTransaction();
        return res.status(404).json({ message: 'Section not found' });
      }
  
      // TODO: remove redundant checking for existence, 
      // Check if teacher exists
      const teacher = await Teacher.findOne({ teacherId }).session(session);
      if (!teacher) {
        await session.abortTransaction();
        return res.status(404).json({ message: 'Teacher not found' });
      }
  
      // Add teacher if not already assigned
      if (!section.teachers.includes(teacherId)) {
        section.teachers.push(teacherId);
        await section.save({ session });
      }
  
      await session.commitTransaction();
      
      // Get all assigned teachers' details
      const assignedTeachers = await Teacher.find({
        teacherId: { $in: section.teachers }
      }).session(session);

      await session.commitTransaction();
      
      // Return the list of assigned teachers
      res.json(assignedTeachers);
    } catch (error) {
      await session.abortTransaction();
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

  async addEnrolledStudentsFromFile(req, res) {
    const { sectionId, schoolYear, semester } = req.params;
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      const requiredFields = ['studentId'];
      const studentIds = await FileProcessingUtil.processFile(req.file, requiredFields);
  
      const section = await Section.findOne({
        sectionId: sectionId,
        schoolYear: schoolYear,
        semester: Number(semester)
      }).session(session);
  
      if (!section) {
        await session.abortTransaction();
        return res.status(404).json({ message: 'Section not found' });
      }
  
      // Check capacity
      if (section.students.length + studentIds.length > section.capacity) {
        await session.abortTransaction();
        return res.status(400).json({ message: 'Section capacity exceeded' });
      }
  
      // Verify all students exist
      const students = await Student.find({ 
        studentId: { $in: studentIds.map(s => s.studentId) } 
      }).session(session);
  
      if (students.length !== studentIds.length) {
        await session.abortTransaction();
        return res.status(400).json({ message: 'Some students do not exist' });
      }

      // Check for duplicates
      const existingStudents = students.filter(s => section.students.includes(s.studentId));
      if (existingStudents.length > 0) {
        await session.abortTransaction();
        return res.status(400).json({ message: 'Some students are already enrolled' });
      }
  
      // Add students (no duplicate) to section
      section.students = [...new Set([...section.students, ...students.map(s => s.studentId)])];
      console.log(section.students);
      await section.save({ session });

      // Create participation reports for each student
      const reports = students.map(student => {
        return new ParticipationReport({
          sectionId: sectionId,
          schoolYear: schoolYear,
          semester: Number(semester),
          studentId: student.studentId
        });
      });

      await ParticipationReport.insertMany(reports, { session });

      // Combine student info with their corresponding section reports
      const studentsWithReport = students.map(student => {
        const report = reports.find(r => 
          r.studentId === student.studentId &&
          r.sectionId === sectionId &&
          r.schoolYear === schoolYear &&
          r.semester === Number(semester)
        ) || {};

        return {
          ...student.toObject(),
          gradeMidterm: report.gradeMidterm || 0,
          gradeFinal: report.gradeFinal || 0,
          gradeOthers: report.gradeOthers || 0,
          gradeTotal: report.gradeTotal || 0
        };
      });
  
      await session.commitTransaction();
      
      res.status(200).json({
        success: true,
        message: 'Students enrolled successfully',
        students: studentsWithReport,
        enrolledCount: students.length
      });
    } catch (error) {
      await session.abortTransaction();
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
