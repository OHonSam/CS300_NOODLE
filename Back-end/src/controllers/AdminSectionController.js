const mongoose = require('mongoose');
const Section = require('../models/SectionModel');

class AdminSectionController {
  // Get all sections
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
      const sections = await Section.find({ schoolYear: schoolYear, semester: Number(semester) });
      console.log(sections);

      const stats = {
        totalSections: sections.length,
        totalTeachers: sections.map(section => section.teacher).length,
        totalStudents: sections.map(section => section.students).length,
        gradeDistribution: {
          A: 0, B: 0, C: 0, D: 0, F: 0
        }
      }

      res.json({ sections, stats });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }

  // Create a new section
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

  // Update and delete methods can be added similarly
  async updateSection(req, res) {
    const sectionId = req.params.sectionId;
    const updateData = req.body;

    try {
      const updatedSection = await Section.findOneAndUpdate(
        { sectionId: sectionId },
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
      console.error('Update section error:', error);
      res.status(500).json({
        error: 'Server error',
        message: error.message
      });
    }
  }

  async deleteSection(req, res) {
    const sectionId = req.params.sectionId;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const deletedSection = await Section.findOneAndDelete(
        { sectionId: sectionId },
        { session }
      );

      if (!deletedSection) {
        await session.abortTransaction();
        return res.status(404).json({ error: 'Section not found' });
      }

      await session.commitTransaction();

      res.json({
        message: 'Section deleted successfully',
        deletedAdmin
      });
    } catch (error) {
      await session.abortTransaction();
      console.error('Delete section error:', error);
      res.status(500).json({
        error: 'Server error',
        message: error.message
      });
    } finally {
      session.endSession();
    }
  }
}

// async createSection(req, res) {
//     try {
//         const { sectionId, courseName, courseCredit, schoolYear, semester, capacity } = req.body;
        
//         const newSection = new Section({
//             sectionId,
//             courseName,
//             courseCredit: Number(courseCredit),
//             schoolYear,
//             semester: Number(semester),
//             capacity: Number(capacity),
//             students: ["None"],
//             teacher: ["None"]
//         });

//         const savedSection = await newSection.save();
//         res.status(201).json(savedSection);

//     } catch (error) {
//         console.error('Section creation error:', error);
//         if (error.code === 11000) {
//             return res.status(400).json({ message: 'Section ID already exists' });
//         }
//         res.status(500).json({ message: error.message });
//     }
//   }
// }

module.exports = new AdminSectionController();