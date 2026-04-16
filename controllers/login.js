const Register = require("../models/registerSchema");
const otpGenerator = require("../utils/otpGenerator");
const sendMail = require("../utils/sendMail");
// const sendMail = require("../utils/sendMail");

exports.login = async (req, res) => {
  try {
    const { phoneNo, dialCode, country } = req.body;

    if (!phoneNo) {
      return res.status(400).json({
        success: false,
        message: "PhoneNo Is Mandatory",
      });
    }

    if (!dialCode) {
      return res.status(400).json({
        success: false,
        message: "Dial Code Is Mandatory",
      });
    }

    if (!country) {
      return res.status(400).json({
        success: false,
        message: "Country is required",
      });
    }

    const generatedOtp = otpGenerator();

    let user = await Register.findOne({ phoneNo });

    // ✅ Case 1: User exists and verified
    if (user && user.isVerified) {
      return res.status(409).json({
        success: false,
        message: "This number is already registered",
      });
    }

    // ✅ Case 2: User exists but not verified → update OTP
    if (user) {
      user.otp = generatedOtp;
      await user.save();
    }
    // ✅ Case 3: New user → create
    else {
      user = await Register.create({
        phoneNo,
        otp: generatedOtp,
        dialCode,
        country
      });
    }

    sendMail(
      "dinesh.kumar@gtftechnologies.com",
      "Hello",
      `Otp is ${generatedOtp}`,
    );

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

    if (!otp) {
      return res.status(400).json({
        success: false,
        message: "Enter Valid Otp",
      });
    }
    let user = await Register.findOne({ phoneNo });

    if (!user) {
      return res.status(400).json({
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

    const isValid = await user.compareOtp(otp);
    console.log(isValid)
    if (!isValid) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    user.isVerified = true;
    user.otp = undefined;
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
