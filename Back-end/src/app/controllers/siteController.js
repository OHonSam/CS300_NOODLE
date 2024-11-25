const section = require('../models/section')

class SiteController {
    index(req, res) {

        section.find({})
        .then(section => {
            // Nếu không có lỗi, trả về danh sách khóa học dưới dạng JSON
            res.json(section);
        })
        .catch(err => {
            // Nếu có lỗi, xử lý lỗi và trả về một trạng thái lỗi hoặc thông báo
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