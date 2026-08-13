const path = require("path");
const mongoose = require("mongoose");

require("dotenv").config({
  path: path.resolve(__dirname, "../../../.env"),
});

const connectDB = require("../config/db");
const User = require("../models/userSchema");

const createSuperAdmin = async () => {
  try {
    // Connect database
    await connectDB();

    console.log("Checking for existing Super Admin...");

    // Check whether superadmin already exists
    const existingSuperAdmin = await User.findOne({
      role: "superadmin",
    });

    if (existingSuperAdmin) {
      console.log("Super Admin already exists.");
      return;
    }

    // Create Super Admin
    const superAdmin = await User.create({
      firstname: "System",
      lastname: "Administrator",
      email: process.env.SUPERADMIN_EMAIL,
      phoneNo: process.env.SUPERADMIN_PHONE,
      password: process.env.SUPERADMIN_PASSWORD,
      role: "superadmin",
      isVerified: true,
      isActive: true,
    });

    console.log("Super Admin created successfully. 🏁");
    console.log("Email:", superAdmin.email);
    console.log("Role:", superAdmin.role);
  } catch (error) {
    console.error("Failed to create Super Admin: 💔", error);
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed. ❌");
  }
};

createSuperAdmin();