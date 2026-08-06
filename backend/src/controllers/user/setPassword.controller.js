const asyncHandler = require("../../utils/asyncHandler");
const { setPassword } = require("../../services/user/user.service");

exports.setPassword = asyncHandler(async (req, res) => {
    await setPassword(req.user._id, req.body);

    res.status(200).json({
        success: true,
        message: "Password created successfully",
    });
});
