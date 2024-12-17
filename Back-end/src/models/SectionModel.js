const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Section = new Schema({
    sectionId: { type: String, required: true, unique: true },
    semester: { type: String, required: true },
    schoolYear: { type: String, required: true },
    capacity: { type: Number, required: true },
    courseName: { type: String, required: true },
    courseCredit: { type:Number, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
});

module.exports = mongoose.model('Section', Section);
