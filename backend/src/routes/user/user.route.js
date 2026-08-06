const express = require("express");

const { protect } = require("../../middleware/auth.middleware");
const { validate } = require("../../middleware/validate.middleware");
const { upload } = require("../../middleware/upload.middleware");

const { getProfile } = require("../../controllers/user/user.read.controller");
const { editProfile } = require("../../controllers/user/editProfile.controller");
const { setPassword } = require("../../controllers/user/setPassword.controller");
const { changePassword } = require("../../controllers/user/changePassword.controller");

const {
  userSchema,
  setPasswordSchema,
  changePasswordSchema,
} = require("../../schemas/user.schema");

const router = express.Router();

// Profile
router.get("/profile", protect, getProfile);

router.post(
  "/edit-profile",
  protect,
  upload.single("avatar"),
  validate(userSchema),
  editProfile,
);

// Password
router.post("/set-password", protect, validate(setPasswordSchema), setPassword);

router.post("/change-password", protect, validate(changePasswordSchema), changePassword);
router.patch("/change-password", protect, validate(changePasswordSchema), changePassword);

module.exports = router;
