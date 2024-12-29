const Material = require('../models/MaterialModel');
const Section = require('../models/SectionModel');
class MaterialController {
    async create(req, res) {
        try {
            const { sectionReference, type, title, content, url } = req.body;
            const { sectionId, schoolYear, semester } = sectionReference;
            
            // First verify if the section exists
            try {
                await this.verifySectionExists({ sectionId, schoolYear, semester });
            } catch (error) {
                return res.status(404).json({ error: 'Referenced section does not exist' });
            }
    
            // Get the count of existing materials and generate new materialId
            const materialsCount = await Material.countDocuments();
            const materialId = `MAT${(materialsCount + 1).toString().padStart(6, '0')}`;
            
            // Create new material with explicit fields
            const material = new Material({
                materialId,
                type,
                title,
                content,
                url,
                sectionReference: {
                    sectionId,
                    schoolYear,
                    semester
                }
            });
            
            const savedMaterial = await material.save();
            res.status(201).json(savedMaterial);
        } catch (error) {
            console.error('Error creating material:', error);
            if (error.name === 'ValidationError') {
                return res.status(400).json({ error: 'Validation error', details: error.message });
            }
            res.status(500).json({ error: 'Error creating material' });
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
            
            res.status(200).json({ materials });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    // Helper method to verify section exists
    async verifySectionExists(sectionReference) {
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

      async update(req, res) {
        try {
            const { materialId } = req.params;
            const updateData = { ...req.body };
            
            // Add updatedAt timestamp
            updateData.updatedAt = new Date();
            
            // If there's a sectionReference, restructure it properly
            if (updateData.sectionReference) {
                const { sectionId, schoolYear, semester } = updateData.sectionReference;
                updateData.sectionReference = {
                    sectionId,
                    schoolYear,
                    semester
                };
            }
            
            const material = await Material.findOneAndUpdate(
                { materialId: materialId },
                { $set: updateData },
                { new: true }
            );
            
            if (!material) {
                return res.status(404).json({ error: 'Material not found' });
            }
            
            res.status(200).json(material);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    
    async delete(req, res) {
        try {
            const { materialId } = req.params;
            
            // Soft delete - just mark as inactive
            const material = await Material.findOneAndUpdate(
                { materialId: materialId },
                { $set: { isActive: false, updatedAt: new Date() } }
            );
            
            if (!material) {
                return res.status(404).json({ error: 'Material not found' });
            }
            
            res.status(200).json({ message: 'Material deleted successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    
    async hardDelete(req, res) {
        try {
            const { materialId } = req.params;
            
            const material = await Material.findOneAndDelete(materialId);
            
            if (!material) {
                return res.status(404).json({ error: 'Material not found' });
            }
            
            res.status(200).json({ message: 'Material permanently deleted' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = new MaterialController();