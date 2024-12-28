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
        await materialController.verifySectionExists(req.body);
        await materialController.create(req, res);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;