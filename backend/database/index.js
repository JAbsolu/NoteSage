const mongoose = require("mongoose");

const DB_URI_STRING = process.env.DB_URI;


const dbConnection = async () => {
  try {
    await mongoose.connect(DB_URI_STRING);
    console.log("Connected to the database..");
  } catch (err) {
    console.error("Database connection error:", err);
  }
};

module.exports = dbConnection;
