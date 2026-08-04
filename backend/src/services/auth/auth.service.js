const authRepository = require("../../repositories/auth/auth.repository");
const otpGenerator = require("../../utils/otpGenerator");
const sendMail = require("../../utils/sendMail");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../../utils/errorHandler");
const crypto = require("crypto");

const checkUserExists = async (fullPhone) => {
  const user = await authRepository.findUser({ phoneNo: fullPhone }, "+password");

  if (user) {
    return {
      success: true,
      exists: true,
      hasPassword: !!user.password,
      phoneNo: fullPhone,
      message: user.password ? "Account Found, Choose Password or Otp Login" : "Otp Required",
    };
  }

  return {
    success: true,
    exists: false,
    hasPassword: false,
    phoneNo: fullPhone,
    message: "Continue verification",
  };
};

const processOtp = async (phoneNo, dialCode, country) => {
  const fullPhone = `${dialCode}${phoneNo}`;
  const user = await authRepository.findUser({ phoneNo: fullPhone });

  if (user && user.otpExpires && user.otpExpires > Date.now() - 60 * 1000) {
    throw new ErrorHandler("Please wait before requesting another verification code", 429);
  }

  const generatedOtp = otpGenerator();

  if (user) {
    user.otp = generatedOtp;
    user.otpExpires = process.env.OTP_EXPIRY;
    await authRepository.saveUser(user);
  } else {
    await authRepository.createUser({
      phoneNo: fullPhone,
      dialCode,
      country,
      otp: generatedOtp,
      otpExpires: process.env.OTP_EXPIRY,
    });
  }

  return generatedOtp;
};

const verifyPasswordLogin = async (phoneNo, email, password) => {
  const query = {};

  if (email) {
    query.email = email.toLowerCase();
  } else if (phoneNo) {
    query.phoneNo = phoneNo;
  } else {
    throw new ErrorHandler("Email or Phone Number is required", 400);
  }

  const user = await authRepository.findUser(query, "+password");

  if (!user) {
    throw new ErrorHandler("Invalid phone number, email, or password", 401);
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new ErrorHandler("Invalid phone number, email, or password", 401);
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

  return { user, token };
};

const generatePasswordResetToken = async (email) => {
  const user = await authRepository.findUser({ email });

  if (!user) {
    return { userFound: false };
  }

  const resetToken = crypto.randomBytes(32).toString("hex");

  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  await authRepository.saveUser(user, { validateBeforeSave: false });

  const resetUrl = `${process.env.CLIENT_URL || "http://localhost:3000"}/reset-password/${resetToken}`;

  await sendMail(
    user.email,
    "Password Reset Request",
    `
      <h2>Password Reset</h2>
      <p>Click the button below to reset your password:</p>
      <a href="${resetUrl}"
         style="padding:10px 20px;background:#00603A;color:#fff;text-decoration:none;border-radius:5px;">
         Reset Password
      </a>

      <p>This link will expire in 15 minutes.</p>
    `,
  );

  return { userFound: true };
};

const resetPasswordWithToken = async (token, newPassword) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await authRepository.findUser({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: {
      $gt: Date.now(),
    },
  }, "+password");

  if (!user) {
    throw new ErrorHandler("Reset password link is invalid or expired", 400);
  }

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await authRepository.saveUser(user);

  return true;
};

const verifyOtp = async (phoneNo, otp) => {
  const user = await authRepository.findUser({ phoneNo }, "+otp +otpExpires");

  if (!user) {
    throw new ErrorHandler("User not found", 404);
  }

  const isOtpValid = await user.compareOtp(otp);
  if (!isOtpValid) {
    throw new ErrorHandler("Invalid verification code", 400);
  }

  if (user.otpExpires && user.otpExpires < Date.now()) {
    throw new ErrorHandler("Verification code has expired", 400);
  }

  // Clear OTP fields
  user.otp = undefined;
  user.otpExpires = undefined;
  await authRepository.saveUser(user);

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

  return { user, token };
};

module.exports = {
  checkUserExists,
  processOtp,
  verifyPasswordLogin,
  generatePasswordResetToken,
  resetPasswordWithToken,
  verifyOtp,
};
