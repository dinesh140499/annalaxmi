const asyncHandler = require("../../utils/asyncHandler");
const { editProfile } = require("../../services/user/user.service");

exports.editProfile = asyncHandler(async (req, res) => {
    const user = await editProfile(req.user._id, req.body, req.file);

    return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user,
    });
});
