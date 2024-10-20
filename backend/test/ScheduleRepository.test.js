const ScheduleRepository = require("../repositories/ScheduleRepository");
const Schedule = require("../models/Schedule");

// Mock the Schedule model
jest.mock("../models/Schedule");

describe("Schedule Repository Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new schedule", async () => {
    const scheduleData = {
      collector: "1",
      center: "2",
      vehicle: "3",
      date: "2024-10-01",
      time: "09:00 AM",
    };
    Schedule.mockReturnValue({
      save: jest.fn().mockResolvedValue(scheduleData),
    });

    const result = await ScheduleRepository.create(scheduleData);
    expect(result).toEqual(scheduleData);
  });

  it("should find a schedule by collector, date, and time", async () => {
    const mockSchedule = {
      collector: "1",
      date: "2024-10-01",
      time: "09:00 AM",
    };
    Schedule.findOne.mockResolvedValue(mockSchedule);

    const result = await ScheduleRepository.findByCollectorDateTime(
      "1",
      "2024-10-01",
      "09:00 AM"
    );
    expect(Schedule.findOne).toHaveBeenCalledWith({
      collector: "1",
      date: "2024-10-01",
      time: "09:00 AM",
    });
    expect(result).toEqual(mockSchedule);
  });
});
