// db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

class Database {
  constructor() {
    if (!Database.instance) {
      this.connection = null;
      Database.instance = this;
    }
    return Database.instance;
  }

  async connect() {
    if (!this.connection) {
      const uri = process.env.MONGODB_URL;

      if (!uri) {
        console.error('MONGODB_URL is not defined in the environment variables.');
        process.exit(1);
      }

      console.log("Attempting to connect to the database...");

      try {
        await mongoose.connect(uri);
        console.log('MongoDB connected');
        this.connection = mongoose.connection;
        return true;  // Connection successful
      } catch (err) {
        console.error('Connection error:', err);
        return false;  // Connection failed
      }
    }

    return this.connection;
  }
  
}

// Export a singleton instance of the Database class
module.exports = new Database();


// Singleton Pattern:

// Use this pattern to ensure only one instance of a class exists. This is often used for managing database connections or configurations.