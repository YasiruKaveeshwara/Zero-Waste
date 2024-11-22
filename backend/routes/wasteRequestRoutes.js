const express = require("express");
const router = express.Router();
const wasteRequestController = require("../controllers/wasteRequestController");

// Define your routes
router.get('/filter', wasteRequestController.getRequestsByFilter);
router.put("/:id/collected", wasteRequestController.markAsCollected);
router.put("/:id/pending", wasteRequestController.markAsPending);

module.exports = router; // Make sure to export the router
