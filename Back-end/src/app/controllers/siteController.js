class SiteController {
    // [GET] /
    index(req, res) {
        res.json({ message: "Home" })
    }

    // [GET] /search
    search(req, res) {
        res.json({ message: "Search" })
    }
  }

module.exports = new SiteController()