const User = require("../models/userSchema");
const asyncHandler = require("../utils/asyncHandler");
const ErrorHandler = require("../utils/errorHandler");

exports.profile = (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
};

exports.editProfile = asyncHandler(async (req, res) => {
  const { firstname, lastname, email } = req.body;

  const updateData = {
    firstname,
    lastname,
    email,
  };

  if (req.file) {
    updateData.avatar = `/uploads/${req.file.filename}`;
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: updateData,
    },
    {
      returnDocument: "after", // modern mongoose
      runValidators: true,
    },
  ).select("-otp");

  if (!updatedUser) {
    return next(new ErrorHandler("User not found", 404));
  }

  return res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user: updatedUser,
  });
});
