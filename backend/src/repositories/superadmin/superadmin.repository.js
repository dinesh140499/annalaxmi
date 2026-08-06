const User = require("../../models/userSchema");

class SuperAdminRepository {
  async createAdmin(adminData) {
    return await User.create(adminData);
  }

  async findByEmailOrPhone(email, phoneNo) {
    return await User.findOne({
      $or: [
        { phoneNo },
        ...(email ? [{ email }] : [])
      ]
    });
  }

  async findAllAdmins() {
    return await User.find({ role: { $in: ["admin", "superadmin"] } }).select("-password");
  }
}

module.exports = new SuperAdminRepository();
