require("dotenv").config();
const mongoose = require("mongoose");


const URI = process.env.MONGO_URI || "mongodb+srv://adityapratap:8t1ORAeTQVt4dk2W@cluster0.krogpgp.mongodb.net/";


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
