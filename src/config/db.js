const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");

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