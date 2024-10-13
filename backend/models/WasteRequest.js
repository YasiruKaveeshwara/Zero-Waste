const mongoose = require('mongoose');

const WasteRequestSchema = new mongoose.Schema({
  resident: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resident',
    required: true
  },
  wasteType: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  collectionDate: {
    type: Date,
    required: true
  },
  collectionTime: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'collected', 'canceled'],
    default: 'pending'
  },
  collectionCenter: {
    type: mongoose.Schema.Types.ObjectId, // Referencing the CollectionCenter model
    ref: 'CollectionCenter',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('WasteRequest', WasteRequestSchema);
