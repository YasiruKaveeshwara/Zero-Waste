const { createWasteRequest, getUserWasteRequests } = require('../controllers/wasteController');
const WasteRequest = require('../models/WasteRequest');
const CollectionCenter = require('../models/Center');

// Mocking external dependencies
jest.mock('../models/WasteRequest');
jest.mock('../models/Center');

describe('wasteController - createWasteRequest', () => {
  it('should create a new waste request successfully with valid data', async () => {
    // Your positive test case for createWasteRequest
  });

  it('should return 400 if collection center is invalid', async () => {
    // Your negative test case for createWasteRequest
  });
});
