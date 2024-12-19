const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  adminId: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
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

module.exports = mongoose.model('Admin', AdminSchema);