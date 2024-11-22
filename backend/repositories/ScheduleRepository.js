const Schedule = require("../models/Schedule");

class ScheduleRepository {
  async create(scheduleData) {
    const schedule = new Schedule(scheduleData);
    return schedule.save();
  }

  async findById(id) {
    return Schedule.findById(id).populate("collector").populate("center").populate("vehicle");
  }

  async findAll() {
    return Schedule.find().populate("collector").populate("center").populate("vehicle");
  }

  async updateStatus(id, status) {
    return Schedule.findByIdAndUpdate(id, { status }, { new: true });
  }

  // You can add more methods as needed for specific queries
}

module.exports = new ScheduleRepository();
