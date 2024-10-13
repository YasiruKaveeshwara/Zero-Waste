// controllers/collectorController.js
const CollectorFactory = require("../factories/collectorFactory");
const Collector = require("../models/collector");
const jwt = require("jsonwebtoken");
const WasteRequest = require("../models/WasteRequest");

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

// Get collection requests based on filter (today, yesterday, week, month)
// In collectorController.js (backend)
exports.getRequestsByFilter = async (req, res) => {
  const { filter } = req.query;
  const now = new Date();
  let startDate;

  switch (filter) {
    case "today":
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case "yesterday":
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
      break;
    case "week":
      startDate = new Date(now.setDate(now.getDate() - now.getDay()));
      break;
    case "month":
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    default:
      return res.status(400).json({ message: "Invalid filter" });
  }

  try {
    // Fetch both pending and collected requests
    const requests = await WasteRequest.find({
      collectionDate: { $gte: startDate },
    })
      .populate("resident", "residentName address") // Populates resident's name and address
      .sort({ status: 1, collectionDate: -1 }); // Sort by status (pending first, then collected)

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching requests", error });
  }
};

// Mark the request as collected
exports.markAsCollected = async (req, res) => {
  const { id } = req.params;

  try {
    const request = await WasteRequest.findById(id);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Update the status to 'collected'
    request.status = "collected";
    await request.save();

    res.status(200).json({ message: "Request marked as collected" });
  } catch (error) {
    res.status(500).json({ message: "Error updating request status", error });
  }
};

// Mark the request as pending (if unchecked)
exports.markAsPending = async (req, res) => {
  const { id } = req.params;

  try {
    const request = await WasteRequest.findById(id);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Update the status to 'pending'
    request.status = "pending";
    await request.save();

    res.status(200).json({ message: "Request marked as pending" });
  } catch (error) {
    res.status(500).json({ message: "Error updating request status", error });
  }
};

// Report an issue with a collection request (Optional)
exports.reportIssue = async (req, res) => {
  const { id } = req.params;
  const { issueDescription } = req.body;

  try {
    const request = await WasteRequest.findById(id);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // You can log the issue or handle it accordingly (save to DB, send notification, etc.)
    console.log(`Issue reported for request ${id}: ${issueDescription}`);

    res.status(200).json({ message: "Issue reported successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error reporting issue", error });
  }
};
