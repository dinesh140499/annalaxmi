const express = require("express");
const { protect } = require("../../middleware/auth.middleware");
const { validate } = require("../../middleware/validate.middleware");
const {
  login,
  sendOtp,
  loginWithPassword,
  forgotPassword,
  resetPassword,
  logout,
  verifyOtp,
  setPassword,
  changePassword,
} = require("../../controllers/auth/auth.controller");
const {
  loginSchema,
  sendOtpSchema,
  verifyOtpSchema,
  loginWithPasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  setPasswordSchema,
  changePasswordSchema,
} = require("../../schemas/auth.schema");

const router = express.Router();

router.post("/login", validate(loginSchema), login);
router.post("/send-otp", validate(sendOtpSchema), sendOtp);
router.post("/verify-otp", validate(verifyOtpSchema), verifyOtp);
router.post("/login-with-password", validate(loginWithPasswordSchema), loginWithPassword);
router.post("/forgot-password", validate(forgotPasswordSchema), forgotPassword);
router.post(
  "/reset-password/:token",
  validate(resetPasswordSchema),
  resetPassword,
);
router.get("/logout", logout);

// Common password routes for user, admin, and superadmin (requires auth)
router.post("/set-password", protect, validate(setPasswordSchema), setPassword);
router.post("/change-password", protect, validate(changePasswordSchema), changePassword);

module.exports = router;

