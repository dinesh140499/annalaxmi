const User = require("../../models/userSchema");

class UpdateUserRepository {
    async findByIdAndUpdate(id, updateData, options = {}) {
        return await User.findByIdAndUpdate(id, updateData, options);
    }
}

module.exports = new UpdateUserRepository();
