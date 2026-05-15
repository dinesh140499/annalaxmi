const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      trim: true,
    },
    company_name: {
      type: String,
      default: "",
    },
    street: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
    },
    states: {
      type: String,
      required: true,
    },
    zip_code: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["home", "office", "other"],
      default: "home",
    },
  },
  { timestamps: true, _id: true },
);

module.exports = addressSchema;
