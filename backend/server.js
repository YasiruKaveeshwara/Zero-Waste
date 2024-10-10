const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3050;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

if (!URL) {
  console.error("MONGODB_URL is not defined in .env file");
  process.exit(1);
}

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection success!");
});

// Routes
app.use('/api/auth', authRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
