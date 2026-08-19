const express = require("express");

const { protect } = require("../../middleware/auth.middleware");
const { authorize } = require("../../middleware/role.middleware");

const { createAdmin } = require("../../controllers/superadmin/createAdmin.controller");
const { getAdmins } = require("../../controllers/superadmin/read.admin.controller");
const { userRoleUpdate } = require("../../controllers/superadmin/updateAdmin.controller");
const { updateAdminRoleSchema } = require("../../schemas/admin.schema");
const { validate } = require("../../middleware/validate.middleware");
const { deleteAdmin } = require("../../controllers/superadmin/deleteAdmin.controller");

const router = express.Router();

// Profile

router.use(protect, authorize('superadmin'))


// Every route below requires Super Admin
router.get(
  "/", getAdmins
);

router.post(
  "/create-admin",
  createAdmin
);

// Role management
router.patch("/update-role/:id", validate(updateAdminRoleSchema), userRoleUpdate);
router.delete("/delete-admin/:id", deleteAdmin);


module.exports = router;
