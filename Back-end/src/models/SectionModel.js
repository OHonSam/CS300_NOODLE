const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Section = new Schema({
    sectionId: { type: String, required: true, unique: true },
    semester: { type: Number, required: true },
    schoolYear: { type: String, required: true },
    semester: { type: Number, required: true },
    capacity: { type: Number, required: true },
    students: {
        type: [{ type: String }],
        unique: false
    },
    teachers    : {
        type: [{ type: String }],
        unique: false
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for currentEnrollment
Section.virtual('currentEnrollment').get(function() {
    return this.students ? this.students.length : 0;
});

module.exports = mongoose.model('Section', Section);
