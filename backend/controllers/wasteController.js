const WasteRequest = require('../models/WasteRequest');
const mongoose = require('mongoose');

// Create a new waste request
exports.createWasteRequest = async (req, res) => {
  try {
    // Check if the database connection is ready
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({ message: 'Database connection is not established.' });
    }

    const { wasteType, quantity, collectionDate, collectionTime } = req.body;

    // Validate request data
    if (!wasteType || !quantity || !collectionDate || !collectionTime) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Create a new waste request
    const newWasteRequest = new WasteRequest({
      resident: req.user.id,
      wasteType,
      quantity,
      collectionDate,
      collectionTime,
    });

    await newWasteRequest.save();
    res.status(201).json({ message: 'Waste request created successfully.' });
  } catch (error) {
    console.error('Error creating waste request:', error);
    res.status(500).json({ message: 'Error creating waste request.', error });
  }
};

// Get all waste requests for the logged-in user
exports.getUserWasteRequests = async (req, res) => {
  try {
    // Check if the database connection is ready
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({ message: 'Database connection is not established.' });
    }

    const requests = await WasteRequest.find({ resident: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching waste requests:', error);
    res.status(500).json({ message: 'Error fetching waste requests.', error });
  }
};

// Get waste progress data for logged-in user
exports.getWasteProgress = async (req, res) => {
  try {
    // Check if the database connection is ready
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({ message: 'Database connection is not established.' });
    }

    // Fetch waste requests only for the logged-in user
    const wasteRequests = await WasteRequest.find({ resident: req.user.id });
    
    // If no waste requests are found
    if (!wasteRequests || wasteRequests.length === 0) {
      return res.status(404).json({ message: 'No waste requests found for this user.' });
    }

    res.status(200).json(wasteRequests);
  } catch (error) {
    console.error('Error fetching waste progress data:', error);
    res.status(500).json({ message: 'Error fetching waste progress data.', error });
  }
};