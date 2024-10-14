const request = require("supertest");
const app = require("../server");
const Schedule = require("../models/Schedule");
const GarbageCollector = require("../models/GarbageCollector");
const Center = require("../models/Center");

describe("Schedule API Tests", () => {
  it("should create a new schedule", async () => {
    const collector = await GarbageCollector.create({
      name: "Collector 1",
      phone: "123456789",
    });
    const center = await Center.create({
      name: "Center 1",
      location: "Location 1",
      capacity: 100,
    });

    const response = await request(app).post("/api/schedule").send({
      collectorId: collector._id,
      centerId: center._id,
      date: "2024-10-15",
      time: "10:00 AM",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("Schedule created successfully.");
  });

  it("should return schedules for a collector", async () => {
    const collector = await GarbageCollector.create({
      name: "Collector 2",
      phone: "987654321",
    });
    const schedules = await request(app).get(
      `/api/collector/${collector._id}/schedules`
    );

    expect(schedules.statusCode).toBe(200);
    expect(schedules.body).toBeInstanceOf(Array);
  });

  it("should handle errors during schedule creation", async () => {
    const response = await request(app).post("/api/schedule").send({
      date: "2024-10-15",
      time: "10:00 AM",
    });

    expect(response.statusCode).toBe(400);
  });
});
