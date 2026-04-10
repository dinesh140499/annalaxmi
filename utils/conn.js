const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName:"annalaxmi"
    });
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
}
module.exports = connectDB;
