const jwt = require("jsonwebtoken");
const Collector = require("../models/collector");

exports.protectCollector = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Extract the token
      token = req.headers.authorization.split(" ")[1];

      // Verify the token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the collector by ID and attach to request object (without password)
      req.user = await Collector.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "Not authorized, user not found." });
      }

      next(); // Proceed to the next middleware or controller
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token verification failed." });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token provided." });
  }
};
