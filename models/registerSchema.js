const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const registerSchema = new mongoose.Schema(
  {
    phoneNo: {
      type: String,
      required: true,
      unique: true,
    },
    otp: {
      type: String,
    },
    dialCode: {
      type: String,
    },
    country: {
      type: String,
    },
    otpExpires: {
      type: Date,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

registerSchema.pre("save", async function () {
  if (!this.otp || !this.isModified("otp")) return;
  this.otp = await bcrypt.hash(this.otp, 10);
});

registerSchema.methods.compareOtp = async function (enteredOtp) {
  return await bcrypt.compare(enteredOtp, this.otp);
};

module.exports = mongoose.model("user", registerSchema);
