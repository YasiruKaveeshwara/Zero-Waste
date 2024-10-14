const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema(
  {
    collector: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GarbageCollector",
      required: true,
    },
    center: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Center",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["scheduled", "completed", "canceled"],
      default: "scheduled",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Schedule", ScheduleSchema);
