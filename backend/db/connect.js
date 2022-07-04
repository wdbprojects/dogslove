const mongoose = require("mongoose");

const connectDB = (url) => {
  mongoose.connect(url);
  console.log("Successfully connected to MongoDB");
};

module.exports = connectDB;
