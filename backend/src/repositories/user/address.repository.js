const Address = require("../../models/addressSchema");

class AddressRepository {
  async create(addressData) {
    return await Address.create(addressData);
  }

  async findByUserId(userId) {
    return await Address.find({ user: userId }).sort({ isDefault: -1, createdAt: -1 });
  }

  async findByIdAndUserId(id, userId) {
    return await Address.findOne({ _id: id, user: userId });
  }

  async updateByIdAndUserId(id, userId, updateData) {
    return await Address.findOneAndUpdate(
      { _id: id, user: userId },
      { $set: updateData },
      { new: true, runValidators: true }
    );
  }

  async deleteByIdAndUserId(id, userId) {
    return await Address.findOneAndDelete({ _id: id, user: userId });
  }

  async clearDefaultAddresses(userId) {
    return await Address.updateMany({ user: userId }, { isDefault: false });
  }

  async countByUserId(userId) {
    return await Address.countDocuments({ user: userId });
  }
}

module.exports = new AddressRepository();
