const express = require("express");
const router = express.Router();
const scheduleController = require("../controllers/scheduleController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Protected routes for admin to create schedules
router.post("/schedule", protect, adminOnly, scheduleController.createSchedule);
router.get(
  "/collector/:collectorId/schedules",
  protect,
  scheduleController.getCollectorSchedules
);

module.exports = router;
