const adminRepository = require('../../../repositories/superadmin/superadmin.repository');
const ErrorHandler = require('../../../utils/errorHandler');

exports.updateUserRole = async (id, body) => {
  if (!body || !body.role) {
    throw new ErrorHandler("Role is required", 400);
  }

  const user = await adminRepository.findUserById(id);

  if (!user) {
    throw new ErrorHandler("User not found", 404);
  }

  user.role = body.role;
  user.updatedAt = new Date();
  await user.save();

  return user;
};
             