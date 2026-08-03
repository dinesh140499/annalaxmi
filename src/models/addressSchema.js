const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      trim: true,
    },
    phone: String,
    company_name: {
      type: String,
      default: "",
    },
    street: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    zip_code: {
      type: String,
      required: true,
      trim: true,
    },
    landmark: String,
    type: {
      type: String,
      enum: ["home", "office", "other"],
      default: "home",
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, _id: true },
);

module.exports = mongoose.model("Address", addressSchema);
