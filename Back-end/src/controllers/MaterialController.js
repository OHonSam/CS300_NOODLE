const Material = require('../models/MaterialModel');

class MaterialController {
    async create(req, res) {
        try {
            const { sectionId, schoolYear, semester, ...materialData } = req.body;
            
            const material = new Material({
                ...materialData,
                sectionReference: {
                    sectionId,
                    schoolYear,
                    semester
                }
            });
            
            await material.save();
            res.status(201).json(material);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getBySectionReference(req, res) {
        try {
            const { schoolYear, semester, sectionId } = req.params;
            
            const materials = await Material.find({
                'sectionReference.sectionId': sectionId,
                'sectionReference.schoolYear': schoolYear,
                'sectionReference.semester': parseInt(semester),
                isActive: true
            }).sort({ createdAt: -1 });
            
            res.status(201).json({ materials });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    // Helper method to verify section exists
    async verifySectionExists(sectionReference) {
        const Section = mongoose.model('Section');
        const section = await Section.findOne({
            sectionId: sectionReference.sectionId,
            schoolYear: sectionReference.schoolYear,
            semester: sectionReference.semester
        });
        
        if (!section) {
            throw new Error('Referenced section does not exist');
        }
        return section;
    }
};

module.exports = new MaterialController();