const mongoose = require('mongoose');
const Admin = require('../../models/AdminModel');
const { Account, RoleId } = require('../../models/AccountModel');
const { FileProcessingUtil, BulkUserCreationUtil } = require('../../utils/FileProcessing');

class AdminAccountController {
  // Get page number and items per page from request query
  async getAdmins(req, res) {
    try {
      // Find admins with pagination
      const admins = await Admin.find()
      // Send response
      res.json({
        admins,
      });

    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }

  async addAdminsFromFile(req, res) {
    try {
      const requiredFields = ['adminId', 'fullName', 'email', 'gender', 'dob', 'address', 'phone' ];
      const userData = await FileProcessingUtil.processFile(req.file, requiredFields);

      const result = await BulkUserCreationUtil.createUsers(userData, {
        UserModel: Admin,
        roleId: RoleId.ADMIN,
        userIdField: 'adminId',
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
  
  // Create a new admin with account
  async createAdmin(req, res) {
    const adminData = req.body;
    try {
      // Create associated account
      const newAccount = new Account({
        username: adminData.adminId,
        password: adminData.adminId, // Using adminId as initial password
        email: adminData.email,
        roleId: RoleId.ADMIN,
      });
      await newAccount.save();

      // Create the admin first
      const newAdmin = new Admin(adminData);
      await newAdmin.save();

      res.status(201).json({
        admin: newAdmin,
        account: newAccount,
      });
    } catch (error) {
      // Duplicate account error
      if (error.code === 11000) {
        res.status(400).json({
          error: 'Bad request',
          message: 'Administrator existed already!',
        });
      } else {
        res.status(500).json({
          error: 'Server error',
          message: error.message,
        });
      }
    }
  }

  // Update an existing admin
  async updateAdmin(req, res) {
    const adminId = req.params.adminId;
    const updateData = req.body;

    // console.log('Updating admin with ID:', adminId);
    // console.log('Update data:', updateData);

    try {

      const updatedAdmin = await Admin.findOneAndUpdate(
        { adminId: adminId },
        { $set: updateData },
        {
          new: true,
          runValidators: true
        }
      );

      // console.log('Updated admin:', updatedAdmin);

      if (!updatedAdmin) {
        console.log('Admin not found');
        return res.status(404).json({
          message: 'Admin not found'
        });
      }

      // If email was updated, also update the associated account
      if (updateData.email) {
        await Account.findOneAndUpdate(
          { username: adminId },
          { email: updateData.email }
        );
      }

      res.json(updatedAdmin);
    } catch (error) {
      console.error('Update admin error:', error);
      res.status(500).json({
        error: 'Server error',
        message: error.message
      });
    }
  }

  // Delete an admin
  async deleteAdmin(req, res) {
    const adminId = req.params.adminId;

    // Use a session to ensure atomic operation
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // 1. Find and delete the admin
      const deletedAdmin = await Admin.findOneAndDelete(
        { adminId: adminId },
        { session }
      );

      // 2. Check if admin exists
      if (!deletedAdmin) {
        await session.abortTransaction();
        return res.status(404).json({ error: 'Admin not found' });
      }

      // 3. Delete the associated account
      const deletedAccount = await Account.findOneAndDelete(
        { username: adminId },
        { session }
      );

      // 4. Check if account was deleted
      if (!deletedAccount) {
        await session.abortTransaction();
        return res.status(500).json({
          error: 'Failed to delete associated account'
        });
      }

      // 5. Commit the transaction
      await session.commitTransaction();

      // 6. Send success response
      res.json({
        message: 'Admin and associated account deleted successfully!',
        deletedAdmin
      });
    } catch (error) {
      // 7. Handle errors
      await session.abortTransaction();
      console.error('Delete admin error:', error);
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

module.exports = new AdminAccountController();
