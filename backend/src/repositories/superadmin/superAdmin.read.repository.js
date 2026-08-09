const Users = require("../../models/userSchema");

class ProdcutReadRepository {
    async getAllAdmins() {
        const admins = await Users.find({ role: 'admin' })
        return admins
    }
}

module.exports = new ProdcutReadRepository();