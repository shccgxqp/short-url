const mongoose = require("mongoose");
require("dotenv").config();

let connetString = process.env.MONGODB_URI
  ? process.env.MONGODB_URI + "/shortUrls"
  : "mongodb://127.0.0.1:27017/url";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(connetString);
    console.log(`Datebas connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
