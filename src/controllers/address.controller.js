const Address = require("../models/addressSchema");
const mongoose = require("mongoose");

exports.addAddresses = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({
      user: req.user._id,
    });
    return res.status(200).json({
      success: true,
      addresses,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid address id",
      });
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
      res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Address updated successfully",
      address,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid address id",
      });
    }

    const address = await Address.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!address) {
      res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
