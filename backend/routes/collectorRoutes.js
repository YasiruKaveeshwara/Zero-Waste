// routes/collectorRoutes.js
const express = require("express");
const router = express.Router();
const collectorController = require("../controllers/collectorController");
const { protectCollector } = require("../middleware/authCollectorMiddleware");

// Collector authentication routes
router.post("/signup", collectorController.signupCollector);
router.post("/signin", collectorController.signInCollector);

// Collector profile routes (protected)
router.get(
  "/profile",
  protectCollector,
  collectorController.getProfile ||
    function (req, res) {
      res.status(500).json({ message: "getProfile function not implemented." });
    }
);

router.put(
  "/profile",
  protectCollector,
  collectorController.updateProfile ||
    function (req, res) {
      res.status(500).json({ message: "updateProfile function not implemented." });
    }
);

// / Fetch collection requests based on filter (today, yesterday, week, month)
router.get("/requests", protectCollector, collectorController.getRequestsByFilter);

// Mark request as collected or pending
router.put("/requests/:id/collected", protectCollector, collectorController.markAsCollected);
router.put("/requests/:id/pending", protectCollector, collectorController.markAsPending);

// Report issue with request (optional)
router.post("/requests/:id/report", protectCollector, collectorController.reportIssue);

module.exports = router;
