const Admin = require('../models/AdminModel');
const { Account, RoleId } = require('../models/AccountModel');
const bcrypt= require('bcryptjs');

class AdminAccountController {
  // Get page number and items per page from request query
  async getAdmins(req, res) {
    const { page = 1, limit = 10 } = req.query;
    try {
      // Find admins with pagination
      const admins = await Admin.find()
        .skip((page - 1) * limit)   // Skip previous pages
        .limit(parseInt(limit));    // Get only the requested number of items

      // Count total admins for pagination
      const totalAdmins = await Admin.countDocuments();

      // Send response
      res.json({
        admins,
        totalPages: Math.ceil(totalAdmins / limit),
      });

    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }

  // Create a new admin with account
  async createAdmin(req, res) {
    const adminData = req.body;
    try {
      // Create the admin first
      const newAdmin = new Admin(adminData);
      await newAdmin.save();

      // Create associated account
      const newAccount = new Account({
        username: adminData.adminId,
        password: await bcrypt.hash(adminData.adminId, 12), // Using adminId as initial password
        email: adminData.email,
        roleId: RoleId.ADMIN,
        
      });
      await newAccount.save();

      res.status(201).json({
        admin: newAdmin,
        account: newAccount,
      });
    } catch (error) {
      res.status(500).json({ 
        error: 'Server error',
        message: error.message 
      });
    }
  }

  // Update an existing admin
  async updateAdmin(req, res) {
    const adminId = req.params.adminId;
    const updateData = req.body;

    console.log('Updating admin with ID:', adminId);
    console.log('Update data:', updateData);

    try {

      const updatedAdmin = await Admin.findOneAndUpdate(
        { adminId: adminId }, 
        { $set: updateData },
        { new: true,
          runValidators: true
        }
      );

      console.log('Updated admin:', updatedAdmin);

      if (!updatedAdmin) {
        console.log('Admin not found');
        return res.status(404).json({ error: 'Admin not found' });
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
    try {
      const deletedAdmin = await Admin.findByIdAndDelete(adminId);
      if (!deletedAdmin) {
        return res.status(404).json({ error: 'Admin not found' });
      }
      res.json({ message: 'Admin deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
}

module.exports = new AdminAccountController();