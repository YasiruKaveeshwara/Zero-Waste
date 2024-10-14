const express = require("express");
const router = express.Router();
const wasteRequestController = require("../controllers/wasteRequestController");

// Define your routes
router.get("/requests", wasteRequestController.getRequestsByFilter);
router.put("/requests/:id/collected", wasteRequestController.markAsCollected);
router.put("/requests/:id/pending", wasteRequestController.markAsPending);

module.exports = router; // Make sure to export the router
