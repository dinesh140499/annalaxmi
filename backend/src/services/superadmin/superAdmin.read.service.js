const superAdminRepository = require("../../repositories/superadmin/superAdmin.repository");

exports.getAllAdmins = async () => {
    const admins = await superAdminRepository.getAllAdmins();
    return admins;
};