const express = require("express");

const { protect } = require("../middleware/auth.middleware");
const { validate } = require("../middleware/validate.middleware");

const {
  profile,
  editProfile,
  changePassword,
} = require("../controllers/user.controller");

const { upload } = require("../utils/upload");

const userSchema = require("../schemas/userSchema");

const router = express.Router();

router.get("/profile", protect, profile);

router.post(
  "/edit-profile",
  protect,
  upload.single("avatar"),
  validate(userSchema),
  editProfile,
);

router.post("/change-password", protect, changePassword);

module.exports = router;
