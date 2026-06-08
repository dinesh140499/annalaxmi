const express = require("express");
const {
  login,
  sendOtp,
  loginWithPassword,
  logout,
} = require("../controllers/auth.controller");
const { validate } = require("../middleware/validate.middleware");
const { loginSchema, verifyOtpSchema } = require("../schemas/auth.schema");

const router = express.Router();

router.post("/login", validate(loginSchema), login);
router.post("/send-otp", sendOtp);
router.post("/login-with-password", loginWithPassword);
router.get("/logout", logout);

module.exports = router;
