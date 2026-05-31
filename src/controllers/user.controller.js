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
    return next(new new ErrorHandler("User not found", 404));
  }

  return res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user: updatedUser,
  });
});

exports.setPassword = asyncHandler(async (req, res, next) => {

  const { password, confirmPassword } = req.body;

  if (!password || !confirmPassword) {
    return next(new ErrorHandler("All fields required", 400));
  }

  if (password !== confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }

  const user = await User.findById(req.user ._id);

  user.password = password;

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Password set successfully",
  });

});

exports.changePassword = asyncHandler(async (req, res, next) => {

  const { currentPassword, newPassword, confirmPassword } = req.body;

  const user = await User.findById(req.user._id);

  // check user has password or not
  if (!user.password) {
    return next(
      new ErrorHandler("Please create password first", 400)
    );
  }

  const isMatched = await user.comparePassword(currentPassword);

  if (!isMatched) {
    return next(
      new ErrorHandler("Current password incorrect", 400)
    );
  }

  if (newPassword !== confirmPassword) {
    return next(
      new ErrorHandler("Passwords do not match", 400)
    );
  }

  user.password = newPassword;

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });

});
