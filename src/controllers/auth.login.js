const Register = require("../models/registerSchema");
const otpGenerator = require("../utils/otpGenerator");
const sendMail = require("../utils/sendMail");
// const sendMail = require("../utils/sendMail");

exports.login = async (req, res) => {
  try {
    const { phoneNo, dialCode, country } = req.body;

    if (!phoneNo || !dialCode || !country) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const generatedOtp = otpGenerator();

    let user = await Register.findOne({ phoneNo });

    if (user && user.isVerified) {
      return res.status(409).json({
        success: false,
        message: "This number is already registered",
      });
    }

    if (user) {
      user.otp = generatedOtp;
      await user.save();
    } else {
      user = await Register.create({
        phoneNo,
        otp: generatedOtp,
        dialCode,
        country,
      });
    }

    sendMail(process.env.TEST_EMAIL, "Hello", `Otp is ${generatedOtp}`);

    return res.status(200).json({
      success: true,
      message: `OTP sent to ${phoneNo}`,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.verifyOtp = async (req, res, next) => {
  try {
    const { phoneNo, otp } = req.body;

    if (!phoneNo || !otp) {
      return res.status(400).json({
        success: false,
        message: "Phone number and OTP are required",
      });
    }

    let user = await Register.findOne({ phoneNo });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    if (!user.otp) {
      return res.status(400).json({
        success: false,
        message: "OTP already used or not generated",
      });
    }

    if (user.otpExpiresAt < Date.now()) {
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
    user.otpExpiresAt = undefined;
    await user.save();

    return res.status(200).json({
      message: "Otp Verifed Successfully",
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
