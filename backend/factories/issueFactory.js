const Issue = require('../models/Issue');

class IssueFactory {
  static createIssue(collectorId, requestId, description, time) {
    return new Issue({
      collectorId,
      requestId,
      description,
      date: new Date(),
      time,
    });
  }
}

module.exports = IssueFactory;
