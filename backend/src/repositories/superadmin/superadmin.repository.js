const superAdminReadRepository = require("./superAdmin.read.repository");
const superAdminCreateRepository = require("./createSuperAdmin.repositories");
const SuperAdminUpdateRespository = require("./updateSuperAdmin.repository")

module.exports = {
    getAllAdmins: () => superAdminReadRepository.getAllAdmins(),
    createAdmin: () => superAdminCreateRepository.createAdmin(),
    updateAdminRole: (userId, role) => SuperAdminUpdateRespository.updateAdminRole(userId, role),
};