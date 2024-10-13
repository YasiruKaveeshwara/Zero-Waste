const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

class Database {
  constructor() {
    if (!Database.instance) {
      this.connection = null;
      Database.instance = this;
    }
    return Database.instance;
  }

  connect() {
    if (!this.connection) {
      const uri = process.env.MONGODB_URL;

      if (!uri) {
        console.error(
          "MONGODB_URL is not defined in the environment variables."
        );
        process.exit(1);
      }

      return mongoose
        .connect(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        })
        .then(() => {
          console.log("MongoDB connected");
          console.log(
            "Connected to MongoDB database:",
            mongoose.connection.name
          );

          this.connection = mongoose.connection;
          return this.connection; // Return the connection to resolve the promise
        })
        .catch((err) => {
          console.error("Connection error:", err);
          throw err;
        });
    }

    return Promise.resolve(this.connection); // Return the existing connection as a resolved promise
  }
}

// Export a singleton instance of the Database class
module.exports = new Database();
