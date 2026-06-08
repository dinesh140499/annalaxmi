const Register = require("../models/userSchema");
const otpGenerator = require("../utils/otpGenerator");
const sendMail = require("../utils/sendMail");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const ErrorHandler = require("../utils/errorHandler");

// const sendMail = require("../utils/sendMail");

exports.login = asyncHandler(async (req, res) => {
  const { phoneNo, dialCode } = req.body;

  const fullPhone = `${dialCode}${phoneNo}`;

  let user = await Register.findOne({ phoneNo: fullPhone }).select("+password");

  // Existing user
  if (user) {
    return res.status(200).json({
      success: true,
      exists: true,
      hasPassword: !!user.password,
      phoneNo: fullPhone,
      // message: user.password ? "Choose Password or Otp Login" : "Otp Required",
      message: "Account found",
    });
  }

  return res.status(200).json({
    success: true,
    exists: false,
    hasPassword: false,
    phoneNo: fullPhone,
    message: "Continue verification",
  });
});

exports.sendOtp = asyncHandler(async (req, res, next) => {
  const { phoneNo, dialCode, country } = req.body;

  if (!phoneNo || !dialCode || !country) {
    return next(new ErrorHandler("Field Cannot Be Blank", 400));
  }

  const fullPhone = `${dialCode}${phoneNo}`;

  const user = await Register.findOne({
    phoneNo: fullPhone,
  });

  // cooldown
  if (user && user.otpExpires && user.otpExpires > Date.now() - 60 * 1000) {
    return next(
      new ErrorHandler(
        "Please wait before requesting another verification code",
        429,
      ),
    );
  }

  const generatedOtp = otpGenerator();

  if (user) {
    user.otp = generatedOtp;
    user.otpExpires = process.env.OTP_EXPIRY;

    await user.save();
  } else {
    await Register.create({
      phoneNo: fullPhone,
      dialCode,
      country,
      otp: generatedOtp,
      otpExpires: process.env.OTP_EXPIRY,
    });
  }

  return res.status(200).json({
    success: true,
    message: "Verification code sent successfully",
    generatedOtp,
  });
});

exports.loginWithPassword = asyncHandler(async (req, res, next) => {
  const { phoneNo, password, email } = req.body;

  const query = {};

  if (email) {
    query.email = email.toLowerCase();
  } else if (phoneNo) {
    query.phoneNo = phoneNo;
  } else {
    return next(new ErrorHandler("Email or Phone Number is required", 400));
  }

  const user = await Register.findOne(query).select("+password");
  console.log(user);

  if (!user) {
    return next(
      new ErrorHandler("Invalid phone number, email, or password", 401),
    );
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return next(
      new ErrorHandler("Invalid phone number, email, or password", 401),
    );
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: Number(process.env.COOKIE_EXPIRY),
  });

  return res.status(200).json({
    success: true,
    message: "Logged in successfully",
    user: {
      id: user._id,
      firstname: user.firstname,
      email: user.email,
      phoneNo: user.phoneNo,
    },
  });
});

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const { phoneNo } = req.body;

  const user = await Register.findOne({ phoneNo });

  if (!user) {
    return next(
      new ErrorHandler(
        "If an account exists, a verification code has been sent.",
        200,
      ),
    );
  }

  const otp = otpGenerator();

  user.otp = otp;
  user.otpExpires = Date.now() + 5 * 60 * 1000;

  await user.save();

  // send SMS / Email

  res.status(200).json({
    success: true,
    message: "Verification code sent successfully",
  });
});

exports.logout = (req, res) => {
  res.clearCookie("token");

  res.json({
    success: true,
    message: "Logged out successfully",
  });
};
