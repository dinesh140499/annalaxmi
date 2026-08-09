const express = require("express");

const { protect } = require("../../middleware/auth.middleware");
const { authorize } = require("../../middleware/role.middleware");

const { createAdmin } = require("../../controllers/superadmin/createAdmin.controller");
const { getAdmins } = require("../../controllers/superadmin/read.admin.controller");
const router = express.Router();

// Profile

router.use(protect, authorize('superadmin'))

router.get(
    "/", getAdmins
);

router.post(
  "/create-admin",
  createAdmin
);



module.exports = router;
