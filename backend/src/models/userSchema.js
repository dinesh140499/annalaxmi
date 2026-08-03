const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    phoneNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    firstname: {
      type: String,
      default: "",
      trim: true,
    },

    lastname: {
      type: String,
      default: "",
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      minlength: 6,
      select: false,
    },

    dialCode: {
      type: String,
      trim: true,
    },

    country: {
      type: String,
      trim: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    avatar: {
      url: {
        type: String,
        default: "",
      },
      public_id: {
        type: String,
        default: "",
      },
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    otp: {
      type: String,
      select: false,
    },

    otpExpires: {
      type: Date,
      select: false,
    },

    resetPasswordToken: {
      type: String,
      select: false,
    },

    resetPasswordExpire: {
      type: Date,
      select: false,
    },
    // Login Tracking
    lastLogin: {
      type: Date,
    },
  },

  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  // hash otp
  if (this.isModified("otp") && this.otp) {
    this.otp = await bcrypt.hash(this.otp, 10);
  }

  // hash password
  if (this.isModified("password") && this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

userSchema.methods.compareOtp = async function (enteredOtp) {
  if (!this.otp) {
    return false;
  }

  return await bcrypt.compare(enteredOtp, this.otp);
};

userSchema.methods.comparePassword = async function (enteredPassword) {
  if (!this.password) {
    return false;
  }

  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("user", userSchema);
