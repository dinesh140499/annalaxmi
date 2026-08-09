const User = require("../../models/userSchema");

class SuperAdminRepository {
  async createAdmin(adminData) {
    return await User.create(adminData);
  }
}

module.exports = new SuperAdminRepository();
