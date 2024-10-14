// factories/CollectorFactory.js
const Collector = require("../models/collector");

class CollectorFactory {
  static createCollector(collectorData) {
    return new Collector(collectorData);
  }
}

module.exports = CollectorFactory;

// Factory Pattern:
// Use this pattern to create objects, especially when the creation process is complex or involves a lot of logic.
// This pattern ensures that you centralize the creation logic and makes it easy to add new user types without changing much code.
