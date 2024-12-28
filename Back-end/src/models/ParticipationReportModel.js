const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParticipationReportSchema = new Schema({
  studentId: { type: String, required: true },
  sectionId: { type: String, required: true },
  schoolYear: { type: String, required: true },
  semester: { type: Number, required: true },
  grade10: { type: Number, default: 0 },
});

ParticipationReportSchema.index(
  { studentId: 1, sectionId: 1, schoolYear: 1, semester: 1 }, 
  { unique: true }
);

module.exports = mongoose.model('ParticipationReport', ParticipationReportSchema);