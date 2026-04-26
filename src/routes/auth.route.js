const express = require("express");
const { login, verifyOtp } = require("../controllers/auth.login");
const { validate } = require("../middleware/validate.middleware");
const { loginSchema, verifyOtpSchema } = require("../schemas/auth.schema");

const router = express.Router();

router.post("/login", validate(loginSchema), login);
router.post("/verify-otp", validate(verifyOtpSchema), verifyOtp);

module.exports = router;
