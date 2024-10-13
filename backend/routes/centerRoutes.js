const express = require("express");
const router = express.Router();
const collectionCenterController = require("../controllers/centerController");

// CRUD operations for collection centers
router.post("/", collectionCenterController.addCenter);
router.get("/", collectionCenterController.getCenters);
router.put("/:id", collectionCenterController.updateCenter);
router.delete("/:id", collectionCenterController.deleteCenter);

module.exports = router;
