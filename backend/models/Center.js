const mongoose = require("mongoose");

const collectionCenterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    capacity: { type: Number, required: true },
    operatingHours: { type: String, required: true },
    resources: {
      trucks: { type: Number, default: 0 },
      staff: { type: Number, default: 0 }
    },
    peakHours: { type: [String], default: [] }, // Array for peak hours
    status: { type: String, default: "active" } // Status field
  },
  { timestamps: true }
);

module.exports = mongoose.model("CollectionCenter", collectionCenterSchema);
