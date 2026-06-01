const Register = require("../models/userSchema");
const otpGenerator = require("../utils/otpGenerator");
const sendMail = require("../utils/sendMail");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const ErrorHandler = require("../utils/errorHandler");

// const sendMail = require("../utils/sendMail");

exports.login = asyncHandler(async (req, res) => {
  const { phoneNo, dialCode, country } = req.body;

  const fullPhone = `${dialCode}${phoneNo}`;

  let user = await Register.findOne({ phoneNo: fullPhone });

  // ⛔ Cooldown check (prevents spam)
  if (user && user.otpExpires > Date.now() - 60 * 1000) {
    return res.status(429).json({
      success: false,
      message: "Please wait before requesting another OTP",
    });
  }

  const generatedOtp = otpGenerator();

  if (user) {
    user.otp = generatedOtp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    await user.save();
  } else {
    user = await Register.create({
      phoneNo: fullPhone,
      dialCode,
      country,
      otp: generatedOtp,
      otpExpires: Date.now() + 5 * 60 * 1000,
    });
  }

  // try {
  //   await sendMail(
  //     process.env.TEST_EMAIL,
  //     "OTP Verification",
  //     `Your OTP is ${generatedOtp}`,
  //   );
  // } catch (err) {
  //   console.error("Mail error:", err);
  // }

  return res.status(200).json({
    success: true,
    message: "OTP sent successfully",
    generatedOtp,
  });
  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

exports.verifyOtp = asyncHandler(async (req, res, next) => {
  const { phoneNo, otp } = req.body;

  if (!phoneNo || !otp) {
    return res.status(400).json({
      success: false,
      message: "Phone number and OTP are required",
    });
  }

  let user = await Register.findOne({ phoneNo }).select("+otp");

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Not Found",
    });
  }

  console.log("user otp: ", user);

  if (!user.otp) {
    return res.status(400).json({
      success: false,
      message: "OTP already used or not generated",
    });
  }

  if (user.otpExpires < Date.now()) {
    return res.status(400).json({
      success: false,
      message: "OTP expired",
    });
  }

  const isValid = await user.compareOtp(otp);

  if (!isValid) {
    return res.status(400).json({
      success: false,
      message: "Invalid OTP",
    });
  }

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES },
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: Number(process.env.COOKIE_EXPIRY),
  });

  return res.status(200).json({
    success: true,
    message: "Login successful",
    user: {
      id: user._id,
      phoneNo: user.phoneNo,
    },
  });
});

exports.logout = (req, res) => {
  res.clearCookie("token");

  res.json({
    success: true,
    message: "Logged out successfully",
  });
};
