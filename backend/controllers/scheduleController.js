const ScheduleFactory = require("../factories/ScheduleFactory");
const Schedule = require("../models/Schedule");
const Collector = require("../models/collector");
const Center = require("../models/Center");
const Vehicle = require("../models/Vehicle");
const ScheduleRepository = require("../repositories/ScheduleRepository");


// Create a new schedule for garbage collectors
exports.createSchedule = async (req, res) => {
  try {
    const { collectorId, centerId, vehicleId, date, time } = req.body;

    // Validate input
    if (!collectorId || !centerId || !vehicleId || !date || !time) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if the collector, center, and vehicle exist
    const [collector, center, vehicle] = await Promise.all([
      Collector.findById(collectorId),
      Center.findById(centerId),
      Vehicle.findById(vehicleId),
    ]);

    if (!collector || !center || !vehicle) {
      return res
        .status(400)
        .json({ message: "Invalid collector, center, or vehicle." });
    }

    // Check if a schedule already exists for the same time and date
    const existingSchedule = await Schedule.findOne({
      date,
      time,
      collector: collectorId,
    });
    if (existingSchedule) {
      return res
        .status(409)
        .json({
          message:
            "A schedule already exists for this collector at the specified date and time.",
        });
    }

    // Create a new schedule using the factory pattern
    const newSchedule = ScheduleFactory.createSchedule({
      collector: collectorId,
      center: centerId,
      vehicle: vehicleId,
      date,
      time,
    });

    await newSchedule.save();

    return res
      .status(201)
      .json({
        message: "Schedule created successfully.",
        schedule: newSchedule,
      });
  } catch (error) {
    console.error("Error creating schedule:", error);
    return res.status(500).json({ message: "Error creating schedule.", error });
  }
};

// Get all schedules for a specific collector
exports.getCollectorSchedules = async (req, res) => {
  try {
    const { collectorId } = req.params;
    if (!collectorId) {
      return res.status(400).json({ message: "Collector ID is required." });
    }

    const schedules = await Schedule.find({ collector: collectorId })
      .populate("center")
      .populate("vehicle");

    if (!schedules.length) {
      return res
        .status(404)
        .json({ message: "No schedules found for this collector." });
    }

    return res.status(200).json(schedules);
  } catch (error) {
    console.error("Error fetching schedules:", error);
    return res
      .status(500)
      .json({ message: "Error fetching schedules.", error });
  }
};

exports.getAllSchedules = async (req, res) => {
  try {
    const schedules = await ScheduleRepository.findAll();
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: "Error fetching schedules", error });
  }
};
