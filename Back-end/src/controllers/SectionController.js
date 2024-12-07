const section = require('../models/section')

class SectionController {
    index(req, res) {

        section.find({})
        .then(section => {
            res.json(section);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
    }
}

module.exports = new SectionController()