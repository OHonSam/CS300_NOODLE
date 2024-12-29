const mongoose = require('mongoose');
const Announcement = require('../../models/AnnouncementModel');
const { getCurrentDateTimeString } = require('../../utils/DateTimeProcessing');

class AdminAnnouncementController {
  // Get all announcements with pagination
  async getAnnouncements(req, res) {
    try {
      const announcements = await Announcement.find();

      return res.json({
        announcements
      });
    } catch (error) {
      return res.status(500).json({ error: 'Server error!' });
    }
  }

  // Create a new announcement
  async createAnnouncement(req, res) {
    const announcementData = req.body;
    announcementData.createdAt = getCurrentDateTimeString();
    announcementData.updatedAt = announcementData.createdAt;
    console.log('Creating announcement:', announcementData);

    try {
      const newAnnouncement = new Announcement(announcementData);
      await newAnnouncement.save();

      res.status(201).json(newAnnouncement);
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({
          error: 'Bad request',
          message: 'Announcement existed already!',
        });
      } else {
        return res.status(500).json({
          error: 'Server error!',
          message: error.message,
        });
      }
    }
  }

  // Update an existing announcement
  async updateAnnouncement(req, res) {
    const announcementId = req.params.announcementId;
    const updateData = req.body;
    updateData.updatedAt = getCurrentDateTimeString();

    try {
      const updatedAnnouncement = await Announcement.findOneAndUpdate(
        { announcementId: announcementId },
        { $set: updateData },
        { new: true, runValidators: true }
      );

      if (!updatedAnnouncement) {
        return res.status(404).json({ error: 'Announcement not found!' });
      }

      res.json(updatedAnnouncement);
    } catch (error) {
      console.error('Update announcement error:', error.message);
      if (error.code === 11000) {
        return res.status(400).json({
          error: 'Bad request',
          message: 'Announcement existed already!',
        });
      } else {
        return res.status(500).json({
          error: 'Server error',
          message: error.message,
        });
      }
    }
  }

  // Delete an announcement
  async deleteAnnouncement(req, res) {
    console.log('Deleting announcement');
    const announcementId = req.params.announcementId;
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const deletedAnnouncement = await Announcement.findOneAndDelete(
        { announcementId: announcementId },
        { session }
      );

      if (!deletedAnnouncement) {
        await session.abortTransaction();
        return res.status(404).json({ error: 'Announcement not found!' });
      }

      await session.commitTransaction();
      res.json({
        message: 'Announcement deleted successfully!',
        deletedAnnouncement
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

module.exports = new AdminAnnouncementController();
