const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const registerSchema = new mongoose.Schema(
  {
    phoneNo: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    dialCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
    },
    otpExpires: {
      type: Date,
      // index: { expires: 0 },
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

registerSchema.methods.compareOtp = function (enteredOtp) {
  return bcrypt.compare(enteredOtp, this.otp);
};


module.exports = mongoose.model("user", registerSchema);
