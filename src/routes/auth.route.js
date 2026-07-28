const express = require("express");
const {
  login,
  sendOtp,
  loginWithPassword,
  forgotPassword,
  resetPassword,
  logout,
} = require("../controllers/users/auth.controller");
const { validate } = require("../middleware/validate.middleware");
const { loginSchema, resetPasswordSchema } = require("../schemas/auth.schema");

const router = express.Router();

router.post("/login", validate(loginSchema), login);
router.post("/send-otp", sendOtp);
router.post("/login-with-password", loginWithPassword);
router.post("/forgot-password", forgotPassword);
router.post(
  "/reset-password/:token",
  validate(resetPasswordSchema),
  resetPassword,
);
router.get("/logout", logout);

module.exports = router;
