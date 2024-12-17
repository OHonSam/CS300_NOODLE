const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  adminId: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String },
  dob: { type: Date },
  // Add other fields as needed
});

module.exports = mongoose.model('Admin', AdminSchema);