const addressRepository = require("../../repositories/user/address.repository");
const ErrorHandler = require("../../utils/errorHandler");
const mongoose = require("mongoose");

exports.addAddress = async (userId, payload) => {
  // If this is the user's first address, automatically make it default
  const addressCount = await addressRepository.countByUserId(userId);
  let shouldBeDefault = payload.isDefault || addressCount === 0;

  if (shouldBeDefault) {
    await addressRepository.clearDefaultAddresses(userId);
  }

  const addressData = {
    ...payload,
    user: userId,
    isDefault: shouldBeDefault,
  };

  return await addressRepository.create(addressData);
};

exports.getAddresses = async (userId) => {
  return await addressRepository.findByUserId(userId);
};

exports.getAddressById = async (id, userId) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ErrorHandler("Invalid address ID", 400);
  }

  const address = await addressRepository.findByIdAndUserId(id, userId);
  if (!address) {
    throw new ErrorHandler("Address not found", 404);
  }

  return address;
};

exports.updateAddress = async (id, userId, payload) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ErrorHandler("Invalid address ID", 400);
  }

  if (payload.isDefault) {
    await addressRepository.clearDefaultAddresses(userId);
  }

  const updatedAddress = await addressRepository.updateByIdAndUserId(id, userId, payload);

  if (!updatedAddress) {
    throw new ErrorHandler("Address not found", 404);
  }

  return updatedAddress;
};

exports.deleteAddress = async (id, userId) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ErrorHandler("Invalid address ID", 400);
  }

  const deletedAddress = await addressRepository.deleteByIdAndUserId(id, userId);

  if (!deletedAddress) {
    throw new ErrorHandler("Address not found", 404);
  }

  // If deleted address was default, set the latest remaining address as default
  if (deletedAddress.isDefault) {
    const remaining = await addressRepository.findByUserId(userId);
    if (remaining && remaining.length > 0) {
      await addressRepository.updateByIdAndUserId(remaining[0]._id, userId, { isDefault: true });
    }
  }

  return true;
};

exports.setDefaultAddress = async (id, userId) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ErrorHandler("Invalid address ID", 400);
  }

  const address = await addressRepository.findByIdAndUserId(id, userId);
  if (!address) {
    throw new ErrorHandler("Address not found", 404);
  }

  await addressRepository.clearDefaultAddresses(userId);
  const updatedAddress = await addressRepository.updateByIdAndUserId(id, userId, { isDefault: true });

  return updatedAddress;
};
