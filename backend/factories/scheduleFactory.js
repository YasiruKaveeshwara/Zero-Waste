const Schedule = require("../models/Schedule");

class ScheduleFactory {
  static createNormalSchedule({ collector, center, vehicle, date, time }) {
    const schedule = new Schedule({
      collector,
      center,
      vehicle,
      date,
      time,
      status: "scheduled", // Default status
    });
    return schedule.save(); // Ensure to save and return the promise
  }

  static createUrgentSchedule({ collector, center, vehicle, date, time }) {
    const schedule = new Schedule({
      collector,
      center,
      vehicle,
      date,
      time,
      status: "urgent", // Urgent status
    });
    return schedule.save(); // Ensure to save and return the promise
  }

  static createHolidaySchedule({ collector, center, vehicle, date, time }) {
    const schedule = new Schedule({
      collector,
      center,
      vehicle,
      date,
      time,
      status: "holiday", // Holiday status
    });
    return schedule.save(); // Ensure to save and return the promise
  }
}

module.exports = ScheduleFactory;
