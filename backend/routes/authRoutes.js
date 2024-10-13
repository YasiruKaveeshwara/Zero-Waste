const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const wasteController = require('../controllers/wasteController');
const residentController = require('../controllers/residentController');
const { protect } = require('../middleware/authMiddleware');

// Authentication routes
router.post('/signup', authController.signupResident);
router.post('/login', authController.loginResident);

// Waste request routes (protected)
router.post('/waste/request', protect, wasteController.createWasteRequest);
router.get('/waste/history', protect, wasteController.getUserWasteRequests);

// Protected route for fetching waste progress data
router.get('/waste/progress', protect, wasteController.getWasteProgress);

// Resident profile routes (protected)
router.get('/resident/profile', protect, residentController.getProfile);
router.put('/resident/profile', protect, residentController.updateProfile);

module.exports = router;