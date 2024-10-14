const request = require("supertest");
const app = require("../server"); // Import your server

describe("Schedule API Tests", () => {
  it("should create a new schedule successfully", async () => {
    const collector = await request(app).post("/api/collector/signup").send({
      name: "Test Collector",
      phone: "123456789",
      email: "collector@test.com",
      password: "password123",
      city: "Test City",
    });

    const center = await request(app).post("/api/centers").send({
      name: "Test Center",
      location: "Test Location",
      capacity: 100,
    });

    const res = await request(app).post("/api/schedule").send({
      collectorId: collector.body._id,
      centerId: center.body._id,
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
      date: "2024-10-15",
      time: "10:00 AM",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty(
      "message",
      "Collector or Center not found."
    );
  });
});
