const ScheduleFactory = require("../factories/ScheduleFactory");
const Schedule = require("../models/Schedule");
const Collector = require("../models/collector");
const Center = require("../models/Center");
const Vehicle = require("../models/Vehicle");
const WasteRequest = require("../models/WasteRequest");
const ScheduleRepository = require("../repositories/ScheduleRepository");

// Create a new schedule for garbage collectors
exports.createSchedule = async (req, res) => {
  try {
    const { collectorId, centerId, vehicleId, date, time, selectedRequests } =
      req.body;

    // Validate input
    if (
      !collectorId ||
      !centerId ||
      !vehicleId ||
      !date ||
      !time ||
      !selectedRequests
    ) {
      return res
        .status(400)
        .json({ message: "All fields and selected requests are required." });
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
      return res.status(409).json({
        message:
          "A schedule already exists for this collector at the specified date and time.",
      });
    }

    // Validate selected requests (ensure all exist and are 'pending')
    const requests = await WasteRequest.find({
      _id: { $in: selectedRequests },
      status: "pending",
    });

    if (requests.length !== selectedRequests.length) {
      return res.status(400).json({
        message: "Some selected requests are invalid or not pending.",
      });
    }

    // Create a new schedule using the factory pattern
    const newSchedule = await ScheduleFactory.createNormalSchedule({
      collector: collectorId,
      center: centerId,
      vehicle: vehicleId,
      date,
      time,
      requests: selectedRequests, // Store the selected requests in the schedule
    });

    // Update the status of the selected requests to 'scheduled'
    await WasteRequest.updateMany(
      { _id: { $in: selectedRequests } },
      { $set: { status: "scheduled" } }
    );

    return res.status(201).json({
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

// Get all schedules
exports.getAllSchedules = async (req, res) => {
  try {
    const schedules = await ScheduleRepository.findAll();
    return res.status(200).json(schedules);
  } catch (error) {
    console.error("Error fetching schedules:", error);
    return res.status(500).json({ message: "Error fetching schedules", error });
  }
};

// Get schedules by collection center
exports.getSchedulesByCenter = async (req, res) => {
  try {
    const { centerId } = req.params;

    // Validate center ID
    if (!centerId) {
      return res.status(400).json({ message: "Center ID is required." });
    }

    // Find schedules related to the specified center
    const schedules = await Schedule.find({ center: centerId })
      .populate("collector")
      .populate("center")
      .populate("vehicle");

    // Check if schedules exist
    if (!schedules.length) {
      return res
        .status(404)
        .json({ message: "No schedules found for this center." });
    }

    return res.status(200).json(schedules);
  } catch (error) {
    console.error("Error fetching schedules:", error);
    return res
      .status(500)
      .json({ message: "Error fetching schedules.", error });
  }
};
