const Schedule = require("../models/Schedule");

class ScheduleFactory {
  static createSchedule(scheduleData) {
    return new Schedule(scheduleData);
  }
}

module.exports = ScheduleFactory;
