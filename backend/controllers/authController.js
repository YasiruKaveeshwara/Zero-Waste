const Resident = require('../models/Resident');
const jwt = require('jsonwebtoken');

// Signup resident
exports.signupResident = async (req, res) => {
  try {
    const { residentName, address, city, phone, email, password } = req.body;

    // Check if the email is already used
    const existingResident = await Resident.findOne({ email });
    if (existingResident) {
      return res.status(400).json({ message: 'Email already in use.' });
    }

    const newResident = new Resident({
      residentName,
      address,
      city,
      phone,
      email,
      password,
      usertype: 'resident',
    });

    await newResident.save();
    res.status(201).json({ message: 'Resident registered successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering resident.', error });
  }
};

// Login resident
exports.loginResident = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the resident by email
    const resident = await Resident.findOne({ email });
    if (!resident) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Compare the password
    const isMatch = await resident.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: resident._id, usertype: resident.usertype },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      token,
      residentName: resident.residentName,
      email: resident.email,
      address: resident.address,
      phone: resident.phone,
      usertype: resident.usertype,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in resident.', error });
  }
};
