const mongoose = require("mongoose");

const wasteRequestSchema = new mongoose.Schema(
  {
    resident: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resident",
      required: true
    },
    wasteType: { type: String, required: true },
    quantity: { type: String, required: true },
    collectionDate: { type: Date, required: true },
    collectionTime: { type: String, required: true },
    status: { type: String, default: "pending" },
    collectionCenter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CollectionCenter",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("WasteRequest", wasteRequestSchema);
