const mongoose = require("mongoose");
require("dotenv").config();
let connetString = process.env.MONGODB_URI + "/shortUrls";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(connetString);
    console.log(`Datebas connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
