//centerController.js
const CollectionCenter = require("../models/Center");

// Add a new collection center
exports.addCenter = async (req, res) => {
  try {
    const newCenter = new CollectionCenter(req.body);
    await newCenter.save();
    res.status(201).json(newCenter);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add collection center.", error });
  }
};

// Get all collection centers
exports.getCenters = async (req, res) => {
  try {
    const centers = await CollectionCenter.find();
    res.status(200).json(centers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch collection centers.", error });
  }
};

// Update a collection center
exports.updateCenter = async (req, res) => {
  try {
    const center = await CollectionCenter.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!center) return res.status(404).json({ message: "Center not found." });
    res.status(200).json(center);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update collection center.", error });
  }
};

// Delete a collection center
exports.deleteCenter = async (req, res) => {
  try {
    const center = await CollectionCenter.findByIdAndDelete(req.params.id);
    if (!center) return res.status(404).json({ message: "Center not found." });
    res
      .status(200)
      .json({ message: "Collection center deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete collection center.", error });
  }
};
