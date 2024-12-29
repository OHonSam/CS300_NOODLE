const mongoose = require('mongoose');
const Announcement = require('../../models/AnnouncementModel');
class StudentAnnouncementController {
  // Get all announcements with pagination
  async getAnnouncements(req, res) {
    try {
      const announcements = await Announcement.find();

      // TODO: need to choose appropriate fields to return, especially for the sender
      return res.json({
        announcements
      });
    } catch (error) {
      return res.status(500).json({ error: 'Server error!' });
    }
  }
}

module.exports = new StudentAnnouncementController();
