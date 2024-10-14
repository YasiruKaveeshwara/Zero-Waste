const ScheduleFactory = require("../factories/ScheduleFactory");
const Schedule = require("../models/Schedule");
const Collector = require("../models/collector");
const Center = require("../models/Center");

// Create a new schedule for garbage collectors
exports.createSchedule = async (req, res) => {
  try {
    const { collectorId, centerId, vehicleId, date, time } = req.body;

    // Check if the collector and center exist
    const collector = await Collector.findById(collectorId);
    const center = await Center.findById(centerId);
    if (!collector || !center) {
      return res
        .status(400)
        .json({ message: "Collector or Center not found." });
    }

    // Create a schedule using the factory pattern
    const newSchedule = ScheduleFactory.createSchedule({
      collector: collectorId,
      center: centerId,
      vehicle: vehicleId,
      date,
      time,
    });

    await newSchedule.save();

    res.status(201).json({ message: "Schedule created successfully." });
  } catch (error) {
    console.error("Error creating schedule:", error);
    res.status(500).json({ message: "Error creating schedule.", error });
  }
};

// Get all schedules for a specific collector
exports.getCollectorSchedules = async (req, res) => {
  try {
    const { collectorId } = req.params;
    const schedules = await Schedule.find({ collector: collectorId }).populate(
      "center"
    );
    res.status(200).json(schedules);
  } catch (error) {
    console.error("Error fetching schedules:", error);
    res.status(500).json({ message: "Error fetching schedules.", error });
  }
};




// Get all schedules
exports.getAllSchedules = async (req, res) => {
    try {
      const schedules = await Schedule.find().populate("collector center");
      res.status(200).json(schedules);
    } catch (error) {
      console.error("Error fetching all schedules:", error);
      res.status(500).json({ message: "Error fetching all schedules.", error });
    }
  };
