class WelcomeController {
    getWelcomeMessage(req, res) {
      try {
        res.json({ message: "Hello from server qq!" })
      } catch (error) {
        res.status(500).json({ error: error.message })
      }
    }

    getGoodbyeMessage(req, res) {
      try {
        res.json({ message: "Goodbye from server!" })
      } catch (error) {
        res.status(500).json({ error: error.message })
      }
    }
  }

module.exports = new WelcomeController()