const section = require('../models/section')

class SiteController {
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

    home(req, res) {
        res.json({ message: "Home" })
    }

    search(req, res) {
        res.json({ message: "Search" })
    }
  }

module.exports = new SiteController()