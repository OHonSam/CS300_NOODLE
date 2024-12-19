const mongoose = require('mongoose');
const Teacher = require('../models/TeacherModel');
const { Account, RoleId } = require('../models/AccountModel');
const bcrypt = require('bcryptjs');

class TeacherAccountController {
  async getTeachers(req, res) {
    const { page = 1, limit = 10 } = req.query;
    try {
      const teachers = await Teacher.find()
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

      const totalTeachers = await Teacher.countDocuments();

      res.json({
        teachers,
        totalPages: Math.ceil(totalTeachers / limit),
      });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }

  async createTeacher(req, res) {
    const teacherData = req.body;
    try {
      const newAccount = new Account({
        username: teacherData.teacherId,
        password: teacherData.teacherId,
        email: teacherData.email,
        roleId: RoleId.TEACHER,
      });

      await newAccount.save();
      const newTeacher = new Teacher(teacherData);
      await newTeacher.save();

      res.status(201).json({
        teacher: newTeacher,
        account: newAccount,
      });
    } catch (error) {
      res.status(500).json({ 
        error: 'Server error',
        message: error.message 
      });
    }
  }

  async updateTeacher(req, res) {
    const teacherId = req.params.teacherId;
    const updateData = req.body;

    try {
      const updatedTeacher = await Teacher.findOneAndUpdate(
        { teacherId: teacherId },
        { $set: updateData },
        { new: true, runValidators: true }
      );

      if (!updatedTeacher) {
        return res.status(404).json({ error: 'Teacher not found' });
      }

      if (updateData.email) {
        await Account.findOneAndUpdate(
          { username: teacherId },
          { email: updateData.email }
        );
      }

      res.json(updatedTeacher);
    } catch (error) {
      res.status(500).json({ 
        error: 'Server error',
        message: error.message 
      });
    }
  }

  async deleteTeacher(req, res) {
    const teacherId = req.params.teacherId;
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const deletedTeacher = await Teacher.findOneAndDelete(
        { teacherId: teacherId },
        { session }
      );

      if (!deletedTeacher) {
        await session.abortTransaction();
        return res.status(404).json({ error: 'Teacher not found' });
      }

      const deletedAccount = await Account.findOneAndDelete(
        { username: teacherId },
        { session }
      );

      if (!deletedAccount) {
        await session.abortTransaction();
        return res.status(500).json({ 
          error: 'Failed to delete associated account' 
        });
      }

      await session.commitTransaction();
      res.json({ 
        message: 'Teacher and associated account deleted successfully',
        deletedTeacher 
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

module.exports = new TeacherAccountController();