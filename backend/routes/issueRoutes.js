const express = require("express");
const router = express.Router();
const { reportIssue } = require("../controllers/issueController");
const { protectCollector } = require("../middleware/collectorMiddleware");

// Route for reporting issues
router.post("/report", protectCollector, reportIssue);

module.exports = router;
