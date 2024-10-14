// controllers/collectorController.js
const CollectorFactory = require("../factories/collectorFactory");
const Collector = require("../models/collector");
const jwt = require("jsonwebtoken");

// Signup collector (using the factory pattern)
exports.signupCollector = async (req, res) => {
  try {
    const { name, phone, email, password, city } = req.body;

    // Check if the email is already in use
    const existingCollector = await Collector.findOne({ email });
    if (existingCollector) {
      return res.status(400).json({ message: "Email already in use." });
    }

    // Create a new collector using the factory
    const newCollector = CollectorFactory.createCollector({
      name,
      phone,
      email,
      password,
      usertype: "collector",
      city,
    });

    await newCollector.save();
    res.status(201).json({ message: "Collector registered successfully." });
  } catch (error) {
    console.error("Error registering collector:", error);
    res.status(500).json({ message: "Error registering collector.", error });
  }
};

// signin collector
exports.signInCollector = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the collector by email
    const collector = await Collector.findOne({ email });
    if (!collector) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Compare the password
    const isMatch = await collector.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Generate JWT token
    const token = jwt.sign({ id: collector._id, usertype: collector.usertype }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      token,
      name: collector.name,
      email: collector.email,
      phone: collector.phone,
      usertype: collector.usertype,
      city: collector.city,
    });
  } catch (error) {
    console.error("Error logging in collector:", error);
    res.status(500).json({ message: "Error logging in collector.", error });
  }
};

// Get collector profile (Read operation)
exports.getProfile = async (req, res) => {
  try {
    const collector = await Collector.findById(req.user.id).select("-password");
    if (!collector) {
      return res.status(404).json({ message: "Collector not found." });
    }
    res.status(200).json(collector);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile.", error });
  }
};

// Update collector profile (Update operation)
exports.updateProfile = async (req, res) => {
  const { name, email, phone, address } = req.body;

  try {
    const collector = await Collector.findById(req.user.id);

    if (!collector) {
      return res.status(404).json({ message: "Collector not found." });
    }

    // Update fields
    if (name) collector.name = name;
    if (email) collector.email = email;
    if (phone) collector.phone = phone;
    if (address) collector.address = address;

    await collector.save();

    res.status(200).json({ message: "Profile updated successfully.", collector });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile.", error });
  }
};

// Get all collectors (workers)
exports.getAllCollectors = async (req, res) => {
  try {
    const collectors = await Collector.find(); // Fetch all collectors from the database
    res.status(200).json(collectors);
  } catch (error) {
    console.error("Error fetching collectors:", error);
    res.status(500).json({ message: "Error fetching collectors.", error });
  }
};
