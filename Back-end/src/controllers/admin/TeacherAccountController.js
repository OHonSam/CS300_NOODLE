const mongoose = require('mongoose');
const Teacher = require('../../models/TeacherModel');
const Section = require('../../models/SectionModel');
const { Account, RoleId } = require('../../models/AccountModel');
const { FileProcessingUtil, BulkUserCreationUtil } = require('../../utils/FileProcessing');

class TeacherAccountController {
  async getTeachers(req, res) {
    try {
      const teachers = await Teacher.find()

      res.json({
        teachers,
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
        fullName: teacherData.fullName,
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
      if (error.code === 11000) {
        res.status(400).json({
          error: 'Bad request',
          message: 'Teacher existed already!',
        });
      } else {
        res.status(500).json({
          error: 'Server error',
          message: error.message,
        });
      }
    }
  }

  async addTeachersFromFile(req, res) {
    try {
      const requiredFields = ['teacherId', 'fullName', 'email', 'department', 'gender', 'dob', 'address', 'phone'];
      const userData = await FileProcessingUtil.processFile(req.file, requiredFields);

      const result = await BulkUserCreationUtil.createUsers(userData, {
        UserModel: Teacher,
        roleId: RoleId.TEACHER,
        userIdField: 'teacherId',
      });

      res.status(201).json(result);
    } catch (error) {
      console.error('Error processing file:', error);
      res.status(500).json({
        error: 'Server error',
        message: error.message,
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

      if (updateData.fullName) {
        await Account.findOneAndUpdate(
          { username: teacherId },
          { fullName: updateData.fullName }
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

      await Section.updateMany(
        { teachers: teacherId },
        { $pull: { teachers: teacherId } },
        { session }
      );

      await session.commitTransaction();
      res.json({
        message: 'Teacher and associated account deleted successfully!',
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
