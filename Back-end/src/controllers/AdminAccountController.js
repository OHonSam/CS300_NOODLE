const Admin = require('../models/AdminModel');

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

  // Create a new admin
  async createAdmin(req, res) {
    const adminData = req.body;
    try {
      const newAdmin = new Admin(adminData);
      await newAdmin.save();
      res.status(201).json(newAdmin);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }

  // Update an existing admin
  async updateAdmin(req, res) {
    const adminId = req.params.adminId;
    const updateData = req.body;
    try {
      const updatedAdmin = await Admin.findByIdAndUpdate(adminId, updateData, { new: true });
      if (!updatedAdmin) {
        return res.status(404).json({ error: 'Admin not found' });
      }
      res.json(updatedAdmin);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
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