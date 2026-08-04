
const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "annalaxmi",
    });
    console.log("✅ Database Connected");
  } catch (error) {
    console.log("❌ DB Error:", error.message);
  }
}

module.exports = connectDB;