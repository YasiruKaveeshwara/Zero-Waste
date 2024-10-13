const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const db = require("./db");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3050;

app.use(cors());
app.use(bodyParser.json());

// Ensure database connection is established
db.connect()
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error("Database connection failed", err);
    process.exit(1);
  });

// Routes
app.use("/api/auth", authRoutes);

// Only start the server if it's not in a test environment
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export the app for testing
module.exports = app;
