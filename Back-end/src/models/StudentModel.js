const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  // Other fields...
  sections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Section' }],
});

module.exports = mongoose.model('Student', StudentSchema);