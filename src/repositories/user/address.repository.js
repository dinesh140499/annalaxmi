const Address = require("../../models/addressSchema");

exports.create = async (addressData) => {
  return await Address.create(addressData);
};

exports.findByUserId = async (userId) => {
  return await Address.find({ user: userId }).sort({ isDefault: -1, createdAt: -1 });
};

exports.findByIdAndUserId = async (id, userId) => {
  return await Address.findOne({ _id: id, user: userId });
};

exports.updateByIdAndUserId = async (id, userId, updateData) => {
  return await Address.findOneAndUpdate(
    { _id: id, user: userId },
    { $set: updateData },
    { new: true, runValidators: true }
  );
};

exports.deleteByIdAndUserId = async (id, userId) => {
  return await Address.findOneAndDelete({ _id: id, user: userId });
};

exports.clearDefaultAddresses = async (userId) => {
  return await Address.updateMany({ user: userId }, { isDefault: false });
};

exports.countByUserId = async (userId) => {
  return await Address.countDocuments({ user: userId });
};
