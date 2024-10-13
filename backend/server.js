const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes"); // Resident routes
const collectorRoutes = require("./routes/collectorRoutes"); // Collector routes
const db = require("./db");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3050;

app.use(cors());
app.use(bodyParser.json());

(async () => {
  const dbConnected = await db.connect();

  if (dbConnected) {
    console.log("Database connection successful");

    // Resident Routes
    app.use("/api/auth", authRoutes);

    // Collector Routes
    app.use("/api/collector", collectorRoutes);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } else {
    console.error("Database connection failed, exiting...");
    process.exit(1);
  }
})();
