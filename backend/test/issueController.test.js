const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");

// Mock data
const mockCollectorId = new mongoose.Types.ObjectId();
const mockRequestId = new mongoose.Types.ObjectId();
const mockIssueData = {
  collectorId: mockCollectorId,
  requestId: mockRequestId,
  description: "Test issue",
  time: "14:00",
};

describe("Issue Reporting", () => {
  it("should report an issue successfully", async () => {
    const res = await request(app).post("/api/issues/report").send(mockIssueData).set("Authorization", `Bearer valid_token`);

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Issue reported successfully.");
    expect(res.body.issue).toHaveProperty("_id");
  });

  it("should return a 400 error when missing fields", async () => {
    const res = await request(app).post("/api/issues/report").send({ collectorId: mockCollectorId }).set("Authorization", `Bearer valid_token`);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("All fields are required.");
  });
});
