const Schedule = require("../models/Schedule");

class ScheduleFactory {
  static async createNormalSchedule({
    collector,
    center,
    vehicle,
    date,
    time,
    requests,
  }) {
    const schedule = new Schedule({
      collector,
      center,
      vehicle,
      date,
      time,
      status: "scheduled", // Default status
      requests, // Save the requests
    });
    await schedule.save();
    return schedule;
  }

  static createUrgentSchedule({ collector, center, vehicle, date, time, requests}) {
    const schedule = new Schedule({
      collector,
      center,
      vehicle,
      date,
      time,
      status: "urgent", // Urgent status
      requests
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
      requests
    });
    return schedule.save(); // Ensure to save and return the promise
  }
}

module.exports = ScheduleFactory;
