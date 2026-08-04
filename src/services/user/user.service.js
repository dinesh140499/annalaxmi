const userRepository = require("../../repositories/user/user.repository");
const ErrorHandler = require("../../utils/errorHandler");

exports.getProfile = (user) => {
    return user;
};

exports.editProfile = async (userId, body, file) => {
    const { firstname, lastname, email } = body;

    const updateData = {
        firstname,
        lastname,
        email,
        avatar: { url: file?.path, public_id: file?.filename },
    };

    const updatedUser = await userRepository.findByIdAndUpdate(
        userId,
        { $set: updateData },
        {
            returnDocument: "after",
            runValidators: true,
        }
    );

    if (!updatedUser) {
        throw new ErrorHandler("User not found", 404);
    }

    return updatedUser;
};

exports.changePassword = async (userId, body) => {
    const { currentPassword, newPassword, confirmPassword } = body;

    const user = await userRepository.findById(userId, { selectFields: "+password" });

    if (!user.password) {
        throw new ErrorHandler("Please create password first", 400);
    }

    const isMatched = await user.comparePassword(currentPassword);

    if (!isMatched) {
        throw new ErrorHandler("Current password incorrect", 400);
    }

    if (newPassword !== confirmPassword) {
        throw new ErrorHandler("Passwords do not match", 400);
    }

    user.password = newPassword;
    await user.save();

    return true;
};

exports.setPassword = async (userId, body) => {
    const { password, confirmPassword } = body;

    if (!password || !confirmPassword) {
        throw new ErrorHandler("All fields are required", 400);
    }

    if (password !== confirmPassword) {
        throw new ErrorHandler("Passwords do not match", 400);
    }

    const user = await userRepository.findById(userId, { selectFields: "+password" });

    console.log(user)

    if (user.password) {
        throw new ErrorHandler("Password already exists. Use change password.", 400);
    }

    user.password = password;
    await user.save();

    return true;
};
