const User = require("../../models/userSchema");

class SuperAdminUpdateRespository {
    async updateAdminRole(userId, role) {
        if (role.includes('superadmin')) {
            throw new ErrorHandler("Super admin role cannot be updated", 400);
        }
        return await User.findById(userId);
    }
}

module.exports = new SuperAdminUpdateRespository();