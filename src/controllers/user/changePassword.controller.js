const asyncHandler = require("../../utils/asyncHandler");
const { changePassword } = require("../../services/user/user.service");

exports.changePassword = asyncHandler(async (req, res) => {
    await changePassword(req.user._id, req.body);

    return res.status(200).json({
        success: true,
        message: "Password changed successfully",
    });
});
