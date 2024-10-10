const WasteRequest = require('../models/WasteRequest');

// Create a new waste request
exports.createWasteRequest = async (req, res) => {
  try {
    const { wasteType, quantity, collectionDate, collectionTime } = req.body;

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
    res.status(500).json({ message: 'Error creating waste request.', error });
  }
};

// Get all waste requests for the logged-in user
exports.getUserWasteRequests = async (req, res) => {
  try {
    const requests = await WasteRequest.find({ resident: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching waste requests.', error });
  }
};
