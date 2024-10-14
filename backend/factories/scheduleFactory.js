const ScheduleRepository = require("../repositories/ScheduleRepository");

class ScheduleFactory {
  static createNormalSchedule({ collector, center, vehicle, date, time }) {
    return ScheduleRepository.create({
      collector,
      center,
      vehicle,
      date,
      time,
      status: "scheduled", // Default to scheduled
    });
  }

  static createUrgentSchedule({ collector, center, vehicle, date, time }) {
    return ScheduleRepository.create({
      collector,
      center,
      vehicle,
      date,
      time,
      status: "urgent", // Urgent status for quick assignments
    });
  }

  static createHolidaySchedule({ collector, center, vehicle, date, time }) {
    return ScheduleRepository.create({
      collector,
      center,
      vehicle,
      date,
      time,
      status: "holiday", // Schedules made for holiday collection
    });
  }
}

module.exports = ScheduleFactory;
