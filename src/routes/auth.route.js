const express = require("express");
const { login, verifyOtp, logout } = require("../controllers/auth.controller");
const { validate } = require("../middleware/validate.middleware");
const { loginSchema, verifyOtpSchema } = require("../schemas/auth.schema");

const router = express.Router();

router.post("/login", validate(loginSchema), login);
router.post("/verify-otp", validate(verifyOtpSchema), verifyOtp);
router.post("/logout", validate(verifyOtpSchema), logout);

module.exports = router;
