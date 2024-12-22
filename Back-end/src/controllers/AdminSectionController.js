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

  async getSections(req, res) {
    const {semester, schoolYear} = req.query;

    try {
      const sections = await Section.find({schoolYear: schoolYear, semester: Number(semester)});
      console.log(sections);

      const stats ={
        totalSections: sections.length,
        totalTeachers: sections.map(section => section.teacher).length,
        totalStudents: sections.map(section => section.students).length,
        gradeDistribution: {
          A: 0, B: 0, C: 0, D: 0, F: 0
        }
      }

      res.json({sections, stats});
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
      res.status(500).json({ 
        error: 'Server error',
        message: error.message 
      });
    }
  }

  // Update and delete methods can be added similarly
}

module.exports = new AdminSectionController();