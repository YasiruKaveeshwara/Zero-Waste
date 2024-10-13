jest.setTimeout(30000);

const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");
const Resident = require("../models/Resident");

let token;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  // Delete any existing admin user with the same email
  await Resident.deleteOne({ email: "admin@example.com" });

  // Create an admin user for testing
  await Resident.create({
    residentName: "Admin",
    email: "admin@example.com",
    password: "admin123",
    phone: "0773308760",
    city: "Main City",
    address: "Admin Office",
    usertype: "admin"
  });
});

afterAll(async () => {
  // Clean up and close the database connection
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.db.dropDatabase(); // Drop test data
    await mongoose.connection.close();
  }
});

describe("Admin API Tests", () => {
  it("should login the admin successfully", async () => {
    const res = await request(app).post("/api/auth/admin/login").send({
      email: "admin@example.com",
      password: "admin123"
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    token = res.body.token; // Save token for further tests
  });

  it("should fail login with invalid password", async () => {
    const res = await request(app).post("/api/auth/admin/login").send({
      email: "admin@example.com",
      password: "wrongpassword"
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Invalid email or password.");
  });

  it("should fail login with non-admin email", async () => {
    const res = await request(app).post("/api/auth/admin/login").send({
      email: "nonadmin@example.com",
      password: "password"
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Invalid email or password.");
  });
});
