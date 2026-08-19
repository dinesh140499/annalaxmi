const adminRepository = require('../../../repositories/superadmin/superadmin.repository');
const ErrorHandler = require('../../../utils/errorHandler');

exports.updateAdminStatus = async (id, body) => {
  if (!id) {
    throw new ErrorHandler("Admin not found",404);
  }

  const admin = await adminRepository.findUserById(id);

  if (!admin) {
    throw new ErrorHandler("Admin not found", 404);
  }

  admin.isActive = body.isActive;

  await admin.save();

  return admin;
}