// Updated routes setup
const express = require('express');
const router = express.Router();
const materialController = require('../controllers/MaterialController');
const authMiddleware = require('../middleware/AuthMiddleware');
router.use(authMiddleware.verifyToken);

// Get materials for a specific section instance
router.get('/:schoolYear/:semester/:sectionId', materialController.getBySectionReference);

// Create material with section reference
router.post('/material', async (req, res) => {
    try {
        // First verify the section exists
        console.log(req.body)
        await materialController.verifySectionExists(req.body.sectionReference);
        await materialController.create(req, res);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update material
router.put('/:materialId', async (req, res) => {
    try {
        if (req.body.sectionReference) {
            await materialController.verifySectionExists(req.body.sectionReference);
        }
        await materialController.update(req, res);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete material (soft delete)
router.delete('/:materialId', materialController.delete);

// Hard delete material (optional - for admin use)
router.delete('/:materialId/permanent', materialController.hardDelete);


module.exports = router;