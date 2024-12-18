const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  studentId: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  class: { type: String, required: true },
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

module.exports = mongoose.model('Student', StudentSchema);