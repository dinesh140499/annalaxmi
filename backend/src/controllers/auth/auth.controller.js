const authService = require("../../services/auth/auth.service");
const asyncHandler = require("../../utils/asyncHandler");
const ErrorHandler = require("../../utils/errorHandler");

exports.login = asyncHandler(async (req, res) => {
  const { phoneNo, dialCode } = req.body;
  const fullPhone = `${dialCode}${phoneNo}`;

  const result = await authService.checkUserExists(fullPhone);

  return res.status(200).json(result);
});

exports.sendOtp = asyncHandler(async (req, res, next) => {
  const { phoneNo, dialCode, country } = req.body;

  if (!phoneNo || !dialCode || !country) {
    return next(new ErrorHandler("Field Cannot Be Blank", 400));
  }

  const generatedOtp = await authService.processOtp(phoneNo, dialCode, country);

  return res.status(200).json({
    success: true,
    message: "Verification code sent successfully",
    generatedOtp,
  });
});

exports.loginWithPassword = asyncHandler(async (req, res, next) => {
  const { phoneNo, password, email } = req.body;

  const { user, token } = await authService.verifyPasswordLogin(phoneNo, email, password);

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
      lastname: user.lastname,
      email: user.email ?? "",
      role: user.role,
      ...(user.avatar?.url ? { avatar: user.avatar.url } : {}),
    },
  });
});

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const result = await authService.generatePasswordResetToken(email);

  if (!result.userFound) {
    return res.status(200).json({
      success: true,
      message: "If an account exists, a reset link has been sent.",
    });
  }

  res.status(200).json({
    success: true,
    message: "Verification code sent successfully",
  });
});

exports.verifyOtp = asyncHandler(async (req, res, next) => {
  const { phoneNo, otp } = req.body;


  const { user, token } = await authService.verifyOtp(phoneNo, otp);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: Number(process.env.COOKIE_EXPIRY),
  });

  return res.status(200).json({
    success: true,
    message: "OTP verified successfully",
    user: {
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email ?? "",
      role: user.role,
      ...(user.avatar?.url ? { avatar: user.avatar.url } : {}),
    },
  });
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  const { password } = req.body;

  await authService.resetPasswordWithToken(req.params.token, password);

  res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
});

exports.logout = (req, res) => {
  res.clearCookie("token");

  res.json({
    success: true,
    message: "Logged out successfully",
  });
};

exports.setPassword = asyncHandler(async (req, res) => {
  await authService.setPassword(req.user._id, req.body);

  res.status(200).json({
    success: true,
    message: "Password created successfully",
  });
});

exports.changePassword = asyncHandler(async (req, res) => {
  await authService.changePassword(req.user._id, req.body);

  return res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});

