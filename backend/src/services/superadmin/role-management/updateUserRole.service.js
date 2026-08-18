const adminRepository = require('../../../repositories/superadmin/superadmin.repository');
const ErrorHandler = require('../../../utils/errorHandler');

exports.updateUserRole = async (id, body) => {
  if (!body || !body.role) {
    throw new ErrorHandler("Role is required", 400);
  }

  const updatedAdmin = await adminRepository.updateAdminRole(id, body.role);

  if (!updatedAdmin) {
    throw new ErrorHandler("User not found", 404);
  }

  return updatedAdmin;
};
             