const asyncHandler = require("../../utils/asyncHandler");
const { deleteAdmin } = require("../../services/superadmin/role-management/deleteAdmin.service");


exports.deleteAdmin = asyncHandler(async (req, res) => {
    const data = await deleteAdmin(req.params.id)
    res.status(200).json({
        success: true,
        message: "Admin deleted successfully",
        data,
    });
})


