// tests/collectorController.test.js
const request = require("supertest");
const app = require("../server"); // Ensure you import your server

describe("Collector Signup", () => {
  it("should create a new collector successfully", async () => {
    const res = await request(app).post("/api/collector/signup").send({
      name: "Test Collector",
      phone: "123456789",
      email: "collector@test.com",
      password: "password123",
      city: "Test City",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "Collector registered successfully.");
  });

  it("should return error if email is already in use", async () => {
    const res = await request(app).post("/api/collector/signup").send({
      name: "Test Collector",
      phone: "123456789",
      email: "existing@collector.com",
      password: "password123",
      city: "Test City",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message", "Email already in use.");
  });
});
