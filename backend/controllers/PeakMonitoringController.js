// controllers/PeakMonitoringController.js
const WasteRequest = require("../models/WasteRequest");

// Function to get peak collection periods
exports.getPeakMonitoring = async (req, res) => {
  try {
    // Fetch all waste requests from the collection
    const wasteRequests = await WasteRequest.find();

    if (wasteRequests.length === 0) {
      return res.status(404).json({ message: "No waste requests found." });
    }

    // Create an object to store count of collections by date and time
    const peakData = {};

    wasteRequests.forEach((request) => {
      const date = request.collectionDate.toISOString().split("T")[0]; // Extract date
      const time = request.collectionTime; // Extract time

      // Increment the count for each date and time slot
      if (!peakData[date]) {
        peakData[date] = {};
      }

      if (!peakData[date][time]) {
        peakData[date][time] = 0;
      }

      peakData[date][time] += 1;
    });

    // Convert peakData object into a sorted array based on date and time
    const peakPeriods = [];

    for (const date in peakData) {
      for (const time in peakData[date]) {
        peakPeriods.push({
          date,
          time,
          count: peakData[date][time] // Count of requests for this date and time slot
        });
      }
    }

    // Sort by highest count first
    peakPeriods.sort((a, b) => b.count - a.count);

    res.status(200).json(peakPeriods);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to calculate peak periods.", error });
  }
};
