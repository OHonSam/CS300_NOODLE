const mongoose = require('mongoose');
const Student = require('../../models/StudentModel');
const Section = require('../../models/SectionModel');
const ParticipationReport = require('../../models/ParticipationReportModel');
const { Account, RoleId } = require('../../models/AccountModel');
const { FileProcessingUtil, BulkUserCreationUtil } = require('../../utils/FileProcessing');

class StudentAccountController {
  // Get page number and items per page from request query
  async getStudents(req, res) {
    try {
      // Find students with pagination
      const students = await Student.find()

      // Send response
      res.json({
        students,
      });

    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }

  async addStudentsFromFile(req, res) {
    try {
      const requiredFields = ['studentId', 'fullName', 'email', 'class', 'gender', 'dob', 'address', 'phone'];
      const userData = await FileProcessingUtil.processFile(req.file, requiredFields);

      const result = await BulkUserCreationUtil.createUsers(userData, {
        UserModel: Student,
        roleId: RoleId.STUDENT,
        userIdField: 'studentId',
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

  // Get a student by studentId
  async getStudentByStudentId(req, res) {
    const studentId = req.params.studentId;
    try {
      const student = await Student
        .findOne({ studentId: studentId })
        .select('-_id -__v'); // Exclude _id and __v fields

      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }

      res.json(student);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }

  // Create a new student with account
  async createStudent(req, res) {
    const studentData = req.body;
    try {
      // Create associated account
      const newAccount = new Account({
        username: studentData.studentId,
        password: studentData.studentId, // Using studentId as initial password
        fullName: studentData.fullName,
        email: studentData.email,
        roleId: RoleId.STUDENT,
      });

      await newAccount.save();
      // Create the student first
      const newStudent = new Student(studentData);
      await newStudent.save();

      res.status(201).json({
        student: newStudent,
        account: newAccount,
      });
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).json({
          error: 'Bad request',
          message: 'Student existed already!',
        });
      } else {
        res.status(500).json({
          error: 'Server error',
          message: error.message,
        });
      }
    }
  }

  // Update an existing student
  async updateStudent(req, res) {
    const studentId = req.params.studentId;
    const updateData = req.body;

    console.log('Updating student with ID:', studentId);
    console.log('Update data:', updateData);

    try {

      const updatedStudent = await Student.findOneAndUpdate(
        { studentId: studentId },
        { $set: updateData },
        {
          new: true,
          runValidators: true
        }
      );

      console.log('Updated student:', updatedStudent);

      if (!updatedStudent) {
        console.log('Student not found');
        return res.status(404).json({ error: 'Student not found' });
      }

      // If email was updated, also update the associated account
      if (updateData.email) {
        await Account.findOneAndUpdate(
          { username: studentId },
          { email: updateData.email }
        );
      }

      if (updateData.fullName) {
        await Account.findOneAndUpdate(
          { username: studentId },
          { fullName: updateData.fullName }
        );
      }

      res.json(updatedStudent);
    } catch (error) {
      console.error('Update student error:', error);
      res.status(500).json({
        error: 'Server error',
        message: error.message
      });
    }
  }

  // Delete an student
  async deleteStudent(req, res) {
    const studentId = req.params.studentId;

    // Use a session to ensure atomic operation
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // 1. Find and delete the student
      const deletedStudent = await Student.findOneAndDelete(
        { studentId: studentId },
        { session }
      );

      // 2. Check if student exists
      if (!deletedStudent) {
        await session.abortTransaction();
        return res.status(404).json({ error: 'Student not found' });
      }

      // 3. Delete the associated account
      const deletedAccount = await Account.findOneAndDelete(
        { username: studentId },
        { session }
      );

      // 4. Check if account was deleted
      if (!deletedAccount) {
        await session.abortTransaction();
        return res.status(500).json({
          error: 'Failed to delete associated account'
        });
      }

      // Delete the student from all sections
      await Section.updateMany(
        { students: studentId },
        { $pull: { students: studentId } },
        { session }
      );

      // Delete associated ParticipationReport if deleting a student account 
      await ParticipationReport.deleteMany(
        { studentId: studentId },
        { session }
      );

      // 5. Commit the transaction
      await session.commitTransaction();

      // 6. Send success response
      res.json({
        message: 'Student and associated account deleted successfully!',
        deletedStudent
      });
    } catch (error) {
      // 7. Handle errors
      await session.abortTransaction();
      console.error('Delete student error:', error);
      res.status(500).json({
        error: 'Server error',
        message: error.message
      });
    } finally {
      // 8. End the session
      session.endSession();
    }
  }
}

module.exports = new StudentAccountController();
