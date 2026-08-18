const Users = require("../../models/userSchema");

class SuperAdminReadRepository {
    async getAllAdmins() {
        return await Users.find({ role: { $in: ['admin', 'superadmin'] } }).sort({ createdAt: -1 });
    }
}

module.exports = new SuperAdminReadRepository();