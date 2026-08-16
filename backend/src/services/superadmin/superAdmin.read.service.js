const superAdminRepository = require("../../repositories/superadmin/superadmin.repository");

exports.getAllAdmins = async () => {
    const admins = await superAdminRepository.getAllAdmins();
    return admins;
};
