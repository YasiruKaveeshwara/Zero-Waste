const ScheduleService = require("../services/ScheduleService");
const Collector = require("../models/Collector");
const Center = require("../models/Center");
const Vehicle = require("../models/Vehicle");

jest.mock("../models/Collector");
jest.mock("../models/Center");
jest.mock("../models/Vehicle");

describe("Schedule Service Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return invalid if collector does not exist", async () => {
    Collector.findById.mockResolvedValue(null);
    const result = await ScheduleService.validateEntities("1", "2", "3");

    expect(result).toEqual({ isValid: false, message: "Invalid collector." });
  });

  it("should return valid if all entities exist", async () => {
    Collector.findById.mockResolvedValue({ _id: "1" });
    Center.findById.mockResolvedValue({ _id: "2" });
    Vehicle.findById.mockResolvedValue({ _id: "3" });

    const result = await ScheduleService.validateEntities("1", "2", "3");
    expect(result).toEqual({ isValid: true });
  });
});
