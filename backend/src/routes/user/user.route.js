const express = require("express");

const { protect } = require("../../middleware/auth.middleware");
const { validate } = require("../../middleware/validate.middleware");
const { upload } = require("../../middleware/upload.middleware");

const { getProfile } = require("../../controllers/user/user.read.controller");
const { editProfile } = require("../../controllers/user/editProfile.controller");

const { userSchema } = require("../../schemas/user.schema");

const router = express.Router();

router.use(protect);

// Profile
router.get("/profile", getProfile);

router.post(
  "/edit-profile",
  upload.single("avatar"),
  validate(userSchema),
  editProfile,
);

module.exports = router;

