const ScheduleFactory = require("../factories/ScheduleFactory");
const Schedule = require("../models/Schedule");

jest.mock("../models/Schedule");

describe("Schedule Factory Tests", () => {
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
      requests: ["req1", "req2"],
    };

    Schedule.mockReturnValue({
      save: jest.fn().mockResolvedValue(scheduleData),
    });

    const result = await ScheduleFactory.createSchedule(scheduleData);
    expect(Schedule).toHaveBeenCalledWith(scheduleData);
    expect(result).toEqual(scheduleData);
  });
});
