const Users = require("../../models/userSchema");

class SuperAdminReadRepository {
    async getAllAdmins() {
        return await Users.find({ role: { $in: ['admin', 'superadmin', 'manager', 'editor', 'viewer'] } }).sort({ createdAt: -1 });
    }
}

module.exports = new SuperAdminReadRepository();