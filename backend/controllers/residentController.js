const Resident = require("../models/Resident");
const UserFactory = require("../factories/residentFactory");
const jwt = require("jsonwebtoken");

// Get resident profile
exports.getProfile = async (req, res) => {
  try {
    const resident = await Resident.findById(req.user.id).select("-password");
    if (!resident) {
      return res.status(404).json({ message: "Resident not found" });
    }
    res.status(200).json(resident);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update resident profile
exports.updateProfile = async (req, res) => {
  const { residentName, address, city, phone, password } = req.body;
  try {
    const resident = await Resident.findById(req.user.id);

    if (!resident) {
      return res.status(404).json({ message: "Resident not found" });
    }

    if (residentName) resident.residentName = residentName;
    if (address) resident.address = address;
    if (city) resident.city = city;
    if (phone) resident.phone = phone;
    if (password) {
      resident.password = password;
    }

    await resident.save();
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Signup resident (using the factory pattern)
exports.signupResident = async (req, res) => {
  try {
    const { residentName, address, city, phone, email, password } = req.body;

    // Check if the email is already used
    const existingResident = await Resident.findOne({ email });
    if (existingResident) {
      return res.status(400).json({ message: "Email already in use." });
    }

    // Create a new resident using the factory
    const newResident = UserFactory.createUser("resident", {
      residentName,
      address,
      city,
      phone,
      email,
      password,
      usertype: "resident",
    });

    await newResident.save();
    res.status(201).json({ message: "Resident registered successfully." });
  } catch (error) {
    console.error("Error registering resident:", error); // Add a console log for debugging
    res.status(500).json({ message: "Error registering resident.", error });
  }
};

// Login resident
exports.loginResident = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the resident by email
    const resident = await Resident.findOne({ email });
    if (!resident) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Compare the password
    const isMatch = await resident.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Generate JWT token
    const token = jwt.sign({ id: resident._id, usertype: resident.usertype }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      token,
      residentName: resident.residentName,
      email: resident.email,
      address: resident.address,
      phone: resident.phone,
      usertype: resident.usertype,
    });
  } catch (error) {
    console.error("Error logging in resident:", error); // Add a console log for debugging
    res.status(500).json({ message: "Error logging in resident.", error });
  }
};
