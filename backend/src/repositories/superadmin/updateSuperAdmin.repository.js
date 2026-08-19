const User = require("../../models/userSchema");

class SuperAdminUpdateRespository {
    async findById(userId) {
        return await User.findById(userId);
    }
}

module.exports = new SuperAdminUpdateRespository();