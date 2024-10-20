const request = require("supertest");
const app = require("../server"); // Import your server
const mongoose = require("mongoose");
const Schedule = require("../models/Schedule");
const Collector = require("../models/Collector");
const Center = require("../models/Center");
const Vehicle = require("../models/Vehicle");
const mongoMemoryServer = require("mongodb-memory-server"); // For in-memory MongoDB

beforeAll(async () => {
  const mongoServer = await mongoMemoryServer.MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Schedule API Tests", () => {
  let collector, center, vehicle;

  beforeEach(async () => {
    // Create mock collector, center, and vehicle
    collector = await Collector.create({
      name: "Test Collector",
      phone: "123456789",
      email: "collector@test.com",
      password: "password123",
      city: "Test City",
    });

    center = await Center.create({
      name: "Test Center",
      location: "Test Location",
      capacity: 100,
    });

    vehicle = await Vehicle.create({
      name: "Test Vehicle",
      licencePlate: "ABC-123",
      center: center._id,
    });
  });

  // afterEach(async () => {
  //   // Clean up after each test
  //   await Schedule.deleteMany();
  //   await Collector.deleteMany();
  //   await Center.deleteMany();
  //   await Vehicle.deleteMany();
  // });

  it("should create a new schedule successfully", async () => {
    const res = await request(app).post("/api/schedule").send({
      collectorId: collector._id,
      centerId: center._id,
      vehicleId: vehicle._id,
      date: "2024-10-15",
      time: "10:00 AM",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty(
      "message",
      "Schedule created successfully."
    );
  });

  it("should return error if collector or center is not found", async () => {
    const res = await request(app).post("/api/schedule").send({
      collectorId: "non-existent-collector-id",
      centerId: "non-existent-center-id",
      vehicleId: vehicle._id,
      date: "2024-10-15",
      time: "10:00 AM",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty(
      "message",
      "Collector or Center not found."
    );
  });

  it("should retrieve all schedules", async () => {
    await Schedule.create({
      collector: collector._id,
      center: center._id,
      vehicle: vehicle._id,
      date: "2024-10-15",
      time: "10:00 AM",
      status: "scheduled",
    });

    const res = await request(app).get("/api/schedule/getAll");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0]).toHaveProperty("status", "scheduled");
  });

  it("should update the schedule status to completed", async () => {
    const schedule = await Schedule.create({
      collector: collector._id,
      center: center._id,
      vehicle: vehicle._id,
      date: "2024-10-15",
      time: "10:00 AM",
      status: "scheduled",
    });

    const res = await request(app)
      .patch(`/api/schedule/${schedule._id}`)
      .send({ status: "completed" });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("status", "completed");
  });

  it("should delete a schedule", async () => {
    const schedule = await Schedule.create({
      collector: collector._id,
      center: center._id,
      vehicle: vehicle._id,
      date: "2024-10-15",
      time: "10:00 AM",
      status: "scheduled",
    });

    const res = await request(app).delete(`/api/schedule/${schedule._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty(
      "message",
      "Schedule deleted successfully."
    );
  });
});
