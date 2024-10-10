const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Signup route
router.post('/signup', authController.signupResident);

// Login route
router.post('/login', authController.loginResident);

module.exports = router;
