const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MaterialSchema = new Schema({
    materialId: {
        type: String,
        required: true,
        unique: true
    },
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
    url: {
        type: String,
        required: false
    },
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

MaterialSchema.index({ materialId: 1 });

// Add pre-save middleware to update the updatedAt timestamp
MaterialSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

module.exports = mongoose.model('Material', MaterialSchema);