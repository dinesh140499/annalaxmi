const express = require("express");
const {
  login,
  sendOtp,
  loginWithPassword,
  forgotPassword,
  resetPassword,
  logout,
  verifyOtp,
} = require("../../controllers/auth/auth.controller");
const {
  loginSchema,
  sendOtpSchema,
  verifyOtpSchema,
  loginWithPasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} = require("../../schemas/auth.schema");
const { validate } = require("../../middleware/validate.middleware");
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

module.exports = router;
