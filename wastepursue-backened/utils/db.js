require("dotenv").config();
const mongoose = require("mongoose");


const URI = process.env.MONGO_URI 


const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("connection sucessfully to db");
  } catch (e) {
    console.error("database connection failed",e);
    process.exit(0);
  }
};
module.exports = connectDb;
