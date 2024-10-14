const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./db");

const residentRoutes = require("./routes/residentRoutes");
const collectorRoutes = require("./routes/collectorRoutes");
const requestRoutes = require("./routes/wasteRequestRoutes");
const issueRoutes = require("./routes/issueRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3050;

app.use(cors());
app.use(bodyParser.json());

(async () => {
  const dbConnected = await db.connect();

  if (dbConnected) {
    console.log("Database connection successful");

    app.use("/api/auth", residentRoutes); // Resident Routes
    app.use("/api/collector", collectorRoutes); // Collector Routes
    app.use("/api/issues", issueRoutes); // Issue Routes
    app.use("/api/requests", requestRoutes); // Waste Request Routes

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } else {
    console.error("Database connection failed, exiting...");
    process.exit(1);
  }
})();
