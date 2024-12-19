const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  teacherId: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  gender: { type: String },
  dob: { type: Date },
  address: { type: String },
  phone: { type: String },
}, {
  toJSON: { 
    transform: function(doc, ret) {
      if (ret.dob) {
        ret.dob = ret.dob.toISOString().split('T')[0]; // Converts to YYYY-MM-DD
      }
      return ret;
    }
  }
});

module.exports = mongoose.model('Teacher', TeacherSchema);