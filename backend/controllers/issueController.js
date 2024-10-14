const IssueFactory = require("../factories/issueFactory");
const WasteRequest = require("../models/WasteRequest");

// Report an issue
exports.reportIssue = async (req, res) => {
  const { requestId, issueDescription } = req.body;
  const collectorId = req.user._id; // Extracted from authenticated collector

  // Validate required fields
  if (!requestId || !issueDescription) {
    return res.status(400).json({ message: "Request ID and issue description are required." });
  }

  try {
    // Verify that the request exists
    const request = await WasteRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found." });
    }

    // Create and save the issue using the factory
    const issue = IssueFactory.createIssue(collectorId, requestId, issueDescription, Date.now());
    await issue.save();

    res.status(201).json({ message: "Issue reported successfully.", issue });
  } catch (error) {
    console.error("Error reporting issue:", error);
    res.status(500).json({ message: "Error reporting issue.", error });
  }
};
