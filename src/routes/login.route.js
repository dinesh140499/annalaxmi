const express = require("express");
const { login, verifyOtp } = require("../controllers/auth.login");

const router = express.Router();

router.post("/login", login);
router.post("/verify-otp", verifyOtp);

module.exports = router;
