require("dotenv").config(); // Make sure to load environment variables

const mongoose = require("mongoose");

// Check if MONGO_URL is correctly defined
if (!process.env.MONGO_URL) {
  console.error("MongoDB URL is not defined in environment variables");
  process.exit(1); // Exit with failure code
}

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL);

const connection = mongoose.connection;

connection.on("error", () => {
  console.log("Error connecting to database");
});

connection.on("connected", () => {
  console.log("MongoDB Connection Successful");
});

module.exports = connection;
