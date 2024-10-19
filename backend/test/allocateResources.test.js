const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server"); // Ensure this points to your app correctly
const CollectionCenter = require("../models/Center");

jest.setTimeout(30000); // Set timeout for async operations

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  // Ensure the required test center is in the DB
  let testCenterWithoutStatus = await CollectionCenter.findOne({
    name: "Test Center Without Status"
  });
  if (!testCenterWithoutStatus) {
    testCenterWithoutStatus = await CollectionCenter.create({
      name: "Test Center Without Status",
      location: "Test Location",
      capacity: 4000,
      allocatedResources: { trucks: 0, staff: 0, totalQuantity: 1000 },
      operatingHours: "9 AM - 5 PM" // Ensure operating hours are present
      // No status field added here
    });
  }
});

afterAll(async () => {
  // Ensure proper teardown and database connection closure
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.close();
  }
});

describe("Resource Allocation Controller", () => {
  it("should log a warning if a center has no status", async () => {
    // Step 1: Mock console.warn
    const consoleWarnSpy = jest
      .spyOn(console, "warn")
      .mockImplementation((message) => {
        console.log(`Warning logged: ${message}`);
      });

    // Step 2: Call the API to trigger the functionality
    const res = await request(app).post("/api/centers/allocate-resources");

    // Step 3: Assert the response from the API
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe(
      "Resources allocated successfully based on total quantity."
    );

    // Step 4: Fetch the center with no status and assert that console.warn was called
    const updatedCenter = await CollectionCenter.findOne({
      name: "Test Center Without Status"
    });

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      `Center with name ${updatedCenter.name} does not have a status.`
    );

    // Step 5: Restore the original console.warn
    consoleWarnSpy.mockRestore();
  });

  it("should return 500 if there is a server error", async () => {
    // Step 1: Backup the original CollectionCenter.find method
    const originalFind = CollectionCenter.find;

    // Step 2: Mock CollectionCenter.find to throw an error
    CollectionCenter.find = jest.fn().mockImplementation(() => {
      throw new Error("Database error");
    });

    // Step 3: Call the API to trigger the error
    const res = await request(app).post("/api/centers/allocate-resources");

    // Step 4: Assert that the API responds with 500 and the correct error message
    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe("Failed to allocate resources.");

    // Step 5: Restore the original CollectionCenter.find method
    CollectionCenter.find = originalFind;
  });
});
