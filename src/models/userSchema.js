const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const addressSchema = require("./addressSchema.js");

const userSchema = new mongoose.Schema(
  {
    phoneNo: {
      type: String,
      required: true,
      unique: true,
    },
    firstname: {
      type: String,
      trim: true,
      default: "",
    },
    lastname: {
      type: String,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      trim: true,
      unique: true,
    },
    dialCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      default: "",
    },
    addresses: [addressSchema],
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    otp: {
      type: String,
    },
    otpExpires: {
      type: Date,
      // index: { expires: 0 },
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (!this.otp || !this.isModified("otp")) return;

  this.otp = await bcrypt.hash(this.otp, 10);
});

userSchema.methods.compareOtp = function (enteredOtp) {
  return bcrypt.compare(enteredOtp, this.otp);
};

module.exports = mongoose.model("user", userSchema);
