const Address = require("../models/addressSchema");
const mongoose = require("mongoose");
const asyncHandler = require("../utils/asyncHandler");
const ErrorHandler = require("../utils/errorHandler");

exports.addAddresses = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const {
    firstname,
    lastname,
    company_name,
    street,
    phone,
    city,
    country,
    state,
    zip_code,
    landmark,
    type,
  } = req.body;

  const newAddress = {
    user: userId,
    firstname,
    lastname,
    company_name,
    street,
    phone,
    city,
    country,
    state,
    zip_code,
    landmark,
    type,
  };

  const address = await Address.create(newAddress);

  return res.status(201).json({
    success: true,
    message: "Address added successfully",
    address: address,
  });
});

exports.getAddresses = asyncHandler(async (req, res) => {
  const addresses = await Address.find({
    user: req.user._id,
  });
  return res.status(200).json({
    success: true,
    addresses,
  });
});

exports.updateAddress = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid address id", 404));
  }

  const address = await Address.findOneAndUpdate(
    {
      _id: id,
      user: req.user._id,
    },
    req.body,
    { new: true },
  );

  if (!address) {
    return next(new ErrorHandler("Address not found", 404));
  }

  return res.status(200).json({
    success: true,
    message: "Address updated successfully",
    address,
  });
});

exports.deleteAddress = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid address id", 400));
  }

  const address = await Address.findOneAndDelete({
    _id: id,
    user: req.user._id,
  });

  if (!address) {
    return next(new ErrorHandler("Address not found", 404));
  }

  return res.status(200).json({
    success: true,
    message: "Address deleted successfully",
  });
});
