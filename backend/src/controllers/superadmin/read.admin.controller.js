const asyncHandler = require("../../utils/asyncHandler");
const { getAllAdmins } = require("../../services/superadmin/superAdmin.service");

exports.getAdmins = asyncHandler(async (req, res) => {
    const admins = await getAllAdmins();
    return res.status(200).json({
        success: true,
        count: admins.length,
        admins
    });
});

