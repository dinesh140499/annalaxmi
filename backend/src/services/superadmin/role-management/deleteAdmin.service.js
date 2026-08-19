const adminRepository = require('../../../repositories/superadmin/superadmin.repository');
const ErrorHandler = require('../../../utils/errorHandler');

exports.deleteAdmin = async (id) => {
    const user = await adminRepository.findUserById(id);
    if (!user) {
        throw new ErrorHandler("User not found", 404);
    }
    await user.deleteOne();
    return user;
}