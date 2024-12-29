const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const { Schema } = mongoose;

const AnnouncementSchema = new Schema({
  announcementId: { type: Number, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  sender: { type: String, required: true },
  createdAt: { type: String },
  updatedAt: { type: String }
});

// Auto-increment announcementId
AnnouncementSchema.plugin(AutoIncrement, { inc_field: 'announcementId' });

module.exports = mongoose.model('Announcement', AnnouncementSchema);
