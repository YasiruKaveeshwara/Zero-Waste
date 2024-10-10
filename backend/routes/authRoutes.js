const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const wasteController = require('../controllers/wasteController');
const { protect } = require('../middleware/authMiddleware');

// Authentication routes
router.post('/signup', authController.signupResident);
router.post('/login', authController.loginResident);

// Waste request routes (protected)
router.post('/waste/request', protect, wasteController.createWasteRequest);
router.get('/waste/history', protect, wasteController.getUserWasteRequests);

module.exports = router;
