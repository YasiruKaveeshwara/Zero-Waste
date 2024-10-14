const { signupResident, loginResident } = require('../controllers/authController');
const Resident = require('../models/Resident');
const UserFactory = require('../factories/UserFactory');
const jwt = require('jsonwebtoken');

// Mocking external dependencies
jest.mock('../models/Resident');
jest.mock('../factories/UserFactory');
jest.mock('jsonwebtoken');

describe('authController - signupResident', () => {
  it('should create a new resident successfully', async () => {
    // Your positive test case for signupResident
  });

  it('should return 400 if email is already in use', async () => {
    // Your negative test case for signupResident
  });
});

describe('authController - loginResident', () => {
  it('should login a resident successfully with correct credentials', async () => {
    // Your positive test case for loginResident
  });

  it('should return 400 if credentials are incorrect', async () => {
    // Your negative test case for loginResident
  });
});
