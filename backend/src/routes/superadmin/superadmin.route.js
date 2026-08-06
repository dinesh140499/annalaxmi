const express = require("express");

const { protect } = require("../../middleware/auth.middleware");
const { authorize } = require("../../middleware/role.middleware");

const { createAdmin } = require("../../controllers/superadmin/createAdmin.controller");
const router = express.Router();

// Profile

router.post(
  "/",
  protect,
  authorize('superadmin'),
  createAdmin
);


module.exports = router;
