const express = require("express");
const { protect } = require("../middleware/auth.middleware");
const { profile,editProfile } = require("../controllers/user.controller");

const router = express.Router();

router.get("/profile",protect, profile);
router.post("/edit-profile",protect, editProfile);

module.exports = router;
  