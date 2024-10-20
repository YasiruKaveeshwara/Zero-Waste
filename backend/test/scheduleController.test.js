const scheduleController = require("../controllers/scheduleController");
const ScheduleRepository = require("../repositories/ScheduleRepository");
const ScheduleFactory = require("../factories/ScheduleFactory");
const WasteRequest = require("../models/WasteRequest");
const ScheduleService = require("../services/ScheduleService");

// Mock dependencies
jest.mock("../repositories/ScheduleRepository");
jest.mock("../factories/ScheduleFactory");
jest.mock("../models/WasteRequest");
jest.mock("../services/ScheduleService");

describe("Schedule Controller Tests", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createSchedule", () => {
    it("should return 400 if required fields are missing", async () => {
      req.body = { collectorId: "1", centerId: "" }; // Missing vehicleId, date, time, selectedRequests
      await scheduleController.createSchedule(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "All fields and selected requests are required.",
      });
    });

    it("should return 409 if a schedule already exists", async () => {
      req.body = {
        collectorId: "670cef5c619101c5f74617d2",
        centerId: "670c9c9bc75ed859fcbb20aa",
        vehicleId: "670c9c9bc75ed859fcbb20aa",
        date: "2024-10-01",
        time: "09:00 AM",
        selectedRequests: ["req1", "req2"],
      };

      ScheduleRepository.findByCollectorDateTime.mockResolvedValue({
        // Mock a schedule that already exists
        _id: "existing-schedule",
      });
      await scheduleController.createSchedule(req, res);

      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({
        message:
          "A schedule already exists for this collector at the specified date and time.",
      });
    });

    it("should create a schedule successfully", async () => {
      req.body = {
        collectorId: "670cef5c619101c5f74617d2",
        centerId: "670c9c9bc75ed859fcbb20aa",
        vehicleId: "670c9c9bc75ed859fcbb20aa",
        date: "2024-10-01",
        time: "09:00 AM",
        selectedRequests: ["req1", "req2"],
      };

      ScheduleService.validateEntities.mockResolvedValue({
        isValid: true,
        message: "",
      });
      WasteRequest.find.mockResolvedValue([
        { _id: "req1", status: "pending" },
        { _id: "req2", status: "pending" },
      ]);
      ScheduleFactory.createSchedule.mockResolvedValue({
        collector: '670cef5c619101c5f74617d2',
        center: '670c9c9bc75ed859fcbb20aa',
        vehicle: '670c9c9bc75ed859fcbb20aa',
        date: '2024-10-01',
        time: '09:00 AM',
        requests: ['req1', 'req2'],
      });

      await scheduleController.createSchedule(req, res);

      expect(ScheduleFactory.createSchedule).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Schedule created successfully.",
        schedule: expect.any(Object),
      });
    });
  });
});
