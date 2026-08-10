const superAdminReadRepository = require("./superAdmin.read.repository");

module.exports = {
    getAllAdmins: () => superAdminReadRepository.getAllAdmins(),
};