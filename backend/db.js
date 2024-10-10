// db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

class Database {
  constructor() {
    if (!Database.instance) {
      this.connection = null;
      this.connect();
      Database.instance = this;
    }
    return Database.instance;
  }

  connect() {
    if (!this.connection) {
      const uri = process.env.MONGODB_URL;

      if (!uri) {
        console.error('MONGODB_URL is not defined in the environment variables.');
        process.exit(1);
      }

      mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('MongoDB connected');
        this.connection = mongoose.connection;
      })
      .catch((err) => {
        console.error('Connection error:', err);
      });
    }

    return this.connection;
  }
}

// Export a singleton instance of the Database class
module.exports = new Database();
