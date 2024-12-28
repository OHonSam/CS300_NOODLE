const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MaterialSchema = new Schema({
    sectionReference: {
        sectionId: { 
            type: String,
            required: true 
        },
        schoolYear: { 
            type: String,
            required: true 
        },
        semester: { 
            type: Number,
            required: true 
        }
    },
    type: {
        type: String,
        enum: ['RESOURCE', 'ASSIGNMENT', 'QUIZ'],
        required: true
    },
    title: { 
        type: String, 
        required: true 
    },
    content: { 
        type: String, 
        required: true 
    },
    files: [{
        fileName: String,
        originalName: String,
        fileSize: Number,
        fileType: String,
        fileUrl: String,
        uploadDate: {
            type: Date,
            default: Date.now
        }
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Create compound index for efficient querying
MaterialSchema.index({
    'sectionReference.sectionId': 1,
    'sectionReference.schoolYear': 1,
    'sectionReference.semester': 1
});

module.exports = mongoose.model('Material', MaterialSchema);





