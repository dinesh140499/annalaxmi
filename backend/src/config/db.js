
const mongoose = require("mongoose");
const dns = require("dns");

// Set public DNS servers to resolve MongoDB Atlas SRV records if local DNS fails
try {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
} catch (e) {
  // ignore if already configured
}

console.log(process.env.MONGODB_URI)

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