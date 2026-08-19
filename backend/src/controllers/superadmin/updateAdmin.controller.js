const asyncHandler = require("../../utils/asyncHandler");
const { updateUserRole } = require("../../services/superadmin/role-management/updateUserRole.service");

exports.userRoleUpdate = asyncHandler(async (req, res) => {
    const roleUpdate = await updateUserRole(req.params.id, req.body);

    return res.status(200).json({
        success: true,
        message: "User role updated successfully",
        data: roleUpdate,
    });
});
