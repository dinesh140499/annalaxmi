const Register = require("../models/registerSchema");
const otpGenerator = require("../utils/otpGenerator");
const sendMail = require("../utils/sendMail");
const jwt = require("jsonwebtoken");
// const sendMail = require("../utils/sendMail");

exports.login = async (req, res) => {
  try {
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
    console.log("else: ",user)

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
    console.log("get user :",user._id)
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    return res.status(200).json({
      success: true,
      message: "Otp Verifed Successfully",
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
