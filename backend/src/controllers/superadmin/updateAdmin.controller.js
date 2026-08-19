const asyncHandler = require("../../utils/asyncHandler");

const {
  updateUserRole,
} = require("../../services/superadmin/role-management/updateUserRole.service");

const {
  updateAdminStatus,
} = require("../../services/superadmin/admin-management/updateAdminStatus.service");

exports.userRoleUpdate = asyncHandler(async (req, res) => {
  const result = await updateUserRole(req.params.id, req.body);

  return res.status(200).json({
    success: true,
    message: "User role updated successfully",
    data: result,
  });
});

exports.adminStatusUpdate = asyncHandler(async (req, res) => {
  const result = await updateAdminStatus(req.params.id, req.body);

  return res.status(200).json({
    success: true,
    message: "Admin status updated successfully",
    data: result,
  });
});