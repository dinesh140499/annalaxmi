const Users = require("../../models/userSchema");

class SuperAdminReadRepository {
    async getAllAdmins() {
        return await Users.find({ role: 'admin' })
    }
}

module.exports = new SuperAdminReadRepository();