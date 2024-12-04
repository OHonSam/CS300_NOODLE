// routes/auth.js
const express = require('express');
const router = express.Router();
const AuthController = require('../app/controllers/AuthController');
const AuthModel = require('../app/models/AuthModel');
const { Account } = require('../app/models/Account');
const authMiddleware = require('../middleware/auth');

// Initialize controller
const authModel = new AuthModel(Account);
const authController = new AuthController(authModel);

// Routes
router.post('/login', (req, res) => authController.login(req, res));
router.post('/logout', authMiddleware.verifyToken, (req, res) => authController.logout(req, res));
router.post('/reset-password', (req, res) => authController.resetPassword(req, res));
router.post('/change-password', authMiddleware.verifyToken, (req, res) => 
  authController.changePassword(req, res)
);

module.exports = router;