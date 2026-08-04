const User = require("../../models/userSchema");

class UserReadRepository {
    async create(data) {
        const user = await User.create(data);
        return user;
    }
    async findOne(query, options = {}) {
        let userData = User.findOne(query);
        if (options.selectFields) {
            userData = userData.select(options.selectFields);
        }
        return await userData;
    }
    async findById(id, options = {}) {
        let query = User.findById(id);
        if (options.selectFields) {
            query = query.select(options.selectFields);
        }
        return await query;
    }
}

module.exports = new UserReadRepository();
