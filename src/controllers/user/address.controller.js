const asyncHandler = require("../../utils/asyncHandler");
const addressService = require("../../services/user/address.service");

exports.addAddresses = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const address = await addressService.addAddress(userId, req.body);

  return res.status(201).json({
    success: true,
    message: "Address added successfully",
    address,
  });
});

exports.getAddresses = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const addresses = await addressService.getAddresses(userId);

  return res.status(200).json({
    success: true,
    addresses,
  });
});

exports.getAddressById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const address = await addressService.getAddressById(id, userId);

  return res.status(200).json({
    success: true,
    address,
  });
});

exports.updateAddress = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const address = await addressService.updateAddress(id, userId, req.body);

  return res.status(200).json({
    success: true,
    message: "Address updated successfully",
    address,
  });
});

exports.deleteAddress = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  await addressService.deleteAddress(id, userId);

  return res.status(200).json({
    success: true,
    message: "Address deleted successfully",
  });
});

exports.setDefaultAddress = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const address = await addressService.setDefaultAddress(id, userId);

  return res.status(200).json({
    success: true,
    message: "Default address updated successfully",
    address,
  });
});
