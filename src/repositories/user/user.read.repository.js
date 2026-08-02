const User = require("../../models/userSchema");

class UserReadRepository {
    async findById(id, options = {}) {
        let query = User.findById(id);
        if (options.selectFields) {
            query = query.select(options.selectFields);
        }
        return await query;
    }
}

module.exports = new UserReadRepository();
