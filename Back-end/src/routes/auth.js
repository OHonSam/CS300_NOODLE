// routes/auth.js
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const AuthService = require('../services/AuthService');
const { User } = require('../models/User');
const authMiddleware = require('../middleware/auth');
const MailService = require('../services/MailService');

// Initialize controller
const mailService = new MailService();
const authService = new AuthService(User);
const authController = new AuthController(authService, mailService);

// Routes
router.post('/login', (req, res) => authController.login(req, res));
router.post('/logout', authMiddleware.verifyToken, (req, res) => authController.logout(req, res));
router.post('/reset-password', (req, res) => authController.resetPassword(req, res));
router.post('/change-password', authMiddleware.verifyToken, (req, res) => 
  authController.changePassword(req, res)
);

module.exports = router;