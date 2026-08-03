const asyncHandler = require("../../utils/asyncHandler");
const { getProfile } = require("../../services/user/user.service");

exports.getProfile = asyncHandler(async (req, res) => {
    const user = getProfile(req.user);

    res.status(200).json({
        success: true,
        user,
    });
});
