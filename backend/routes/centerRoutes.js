const express = require("express");
const router = express.Router();
const collectionCenterController = require("../controllers/centerController");
const peakMonitoringController = require("../controllers/PeakMonitoringController");

// CRUD operations for collection centers
router.post("/", collectionCenterController.addCenter);
router.get("/", collectionCenterController.getCenters);
router.put("/:id", collectionCenterController.updateCenter);
router.delete("/:id", collectionCenterController.deleteCenter);

router.get("/peak-monitoring", peakMonitoringController.getPeakMonitoring);
module.exports = router;
