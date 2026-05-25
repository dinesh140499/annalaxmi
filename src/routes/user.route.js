const express = require("express");

const { protect } = require("../middleware/auth.middleware");
const {validate} = require("../middleware/validate.middleware");

const {
  profile,
  editProfile,
  billingAddress
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
  editProfile
);


module.exports = router;