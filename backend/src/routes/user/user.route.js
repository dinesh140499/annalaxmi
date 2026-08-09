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

router.use(protect)

// Profile
router.get("/profile", getProfile);

router.post(
  "/edit-profile",
  upload.single("avatar"),
  validate(userSchema),
  editProfile,
);

// Password
router.post("/set-password", validate(setPasswordSchema), setPassword);

router.post("/change-password", validate(changePasswordSchema), changePassword);

module.exports = router;
