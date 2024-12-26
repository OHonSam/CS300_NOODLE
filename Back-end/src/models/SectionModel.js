const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Section = new Schema({
    sectionId: { type: String, required: true },
    courseName: { type: String, required: true },
    courseCredit: { type: Number, required: true },
    schoolYear: { type: String, required: true },
    semester: { type: Number, required: true },
    capacity: { type: Number, required: true },
    students: {
        type: [{ type: String }],
        unique: false
    },
    teachers: {
        type: [{ type: String }],
        unique: false
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Add compound index for composite key
Section.index(
    { sectionId: 1, schoolYear: 1, semester: 1 }, 
    { unique: true }
);

// Virtual for currentEnrollment
Section.virtual('currentEnrollment').get(function() {
    return this.students ? this.students.length : 0;
});

module.exports = mongoose.model('Section', Section);
