const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");
const WasteRequest = require("../models/WasteRequest");
const CollectionCenter = require("../models/Center");
const Resident = require("../models/Resident");

jest.setTimeout(30000);

let existingCenterId;
let existingResidentId;

beforeAll(async () => {
  // Connect to the database
  await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  // Fetch existing center data from the database (Ensure the correct center name)
  const existingCenter = await CollectionCenter.findOne({
    name: "Wattala Center" // Make sure this exists in your DB
  });
  if (!existingCenter) {
    throw new Error("Wattala Center data not found in the database.");
  }
  existingCenterId = existingCenter._id;

  // Fetch existing resident data from the database (Ensure the correct resident email)
  const existingResident = await Resident.findOne({
    email: "nuwani@gmail.com"
  });
  if (!existingResident) {
    throw new Error("Resident data not found in the database.");
  }
  existingResidentId = existingResident._id;
});

afterAll(async () => {
  // Close the connection after tests
  await mongoose.connection.close();
});

describe("Peak Monitoring API", () => {
  it("should return peak periods with correct data when waste requests exist", async () => {
    const res = await request(app).get("/api/centers/peak-monitoring");

    // Assertions
    expect(res.statusCode).toBe(200); // Ensure the status is OK
    expect(res.body.length).toBeGreaterThan(0); // Ensure some peak periods are returned
    // Adjust assertion to account for "Unknown Center" if some requests are missing collection centers
    expect(
      res.body.some(
        (entry) =>
          entry.center === "Wattala Center" || entry.center === "Unknown Center"
      )
    ).toBe(true);
  });

  it("should handle requests with missing collection center gracefully", async () => {
    // Fetch a waste request with a missing collection center from the database
    const existingWasteRequestWithNoCenter = await WasteRequest.findOne({
      collectionCenter: null
    });

    if (!existingWasteRequestWithNoCenter) {
      throw new Error(
        "No waste request with missing collection center found in the database."
      );
    }

    const res = await request(app).get("/api/centers/peak-monitoring");

    // Assertions
    expect(res.statusCode).toBe(200);
    expect(res.body.some((entry) => entry.center === "Unknown Center")).toBe(
      true
    ); // Validate "Unknown Center" for missing collection centers
  });

  it("should return a 500 error on server issues", async () => {
    // Temporarily mock WasteRequest.find to throw an error
    const originalFind = WasteRequest.find;
    WasteRequest.find = jest.fn().mockImplementation(() => {
      throw new Error("Database error");
    });

    const res = await request(app).get("/api/centers/peak-monitoring");

    // Assertions
    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe("Failed to calculate peak periods.");

    // Restore the original function
    WasteRequest.find = originalFind;
  });
});
