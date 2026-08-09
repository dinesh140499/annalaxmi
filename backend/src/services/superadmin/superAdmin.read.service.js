const { adminReadRepository } = require("../../repositories/superadmin/superAdmin.repository");

exports.getAllAdmins = async () => {
    const admins = await adminReadRepository.getAllAdmins()
    return admins
}