const userRepositories = require("../../repositories/user/user.repository");
const ErrorHandler = require("../../utils/errorHandler");

exports.createAdminService = async ({ firstName, lastName, email, phoneNo, role, password }) => {
    const user = await userRepositories.findOne({
        $or: [
            { phoneNo },
            { email }
        ]
    });
    if (user) {
        throw new ErrorHandler("User already exists", 400);
    }
    const admin = await userRepositories.create({
        firstName,
        lastName,
        email,
        phoneNo,
        role,
        password,
    });
    return admin;

}
