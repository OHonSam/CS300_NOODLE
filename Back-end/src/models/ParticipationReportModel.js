const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParticipationReportSchema = new Schema({
  studentId: { type: String, required: true },
  sectionId: { type: String, required: true },
  schoolYear: { type: String, required: true },
  semester: { type: Number, required: true },
  gradeMidterm: { 
    type: Number, 
    default: 0,
    min: 0,
    max: 10 
  },
  gradeFinal: { 
    type: Number, 
    default: 0,
    min: 0,
    max: 10 
  },
  gradeOthers: { 
    type: Number, 
    default: 0,
    min: 0,
    max: 10 
  }
});

ParticipationReportSchema.index(
  { studentId: 1, sectionId: 1, schoolYear: 1, semester: 1 }, 
  { unique: true }
);

ParticipationReportSchema.virtual('gradeAverage').get(function() {
  const average = (this.gradeMidterm + this.gradeFinal + this.gradeOthers) / 3;
  return Number(average.toFixed(2));
});

module.exports = mongoose.model('ParticipationReport', ParticipationReportSchema);