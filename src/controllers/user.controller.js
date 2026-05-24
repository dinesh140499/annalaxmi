const Address = require("../models/addressSchema");
const User = require("../models/userSchema");

exports.profile = (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
};

exports.editProfile = async (req, res) => {
  try {
    const { firstname, lastname, email } = req.body;

    let avatar = "";

    if (req.file) {
      avatar = `/uploads/${req.file.filename}`;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          firstname,
          lastname,
          email,
          ...(avatar && { avatar }),
        },
      },
      {
        new: true,
        runValidators: true,
      },
    ).select("-otp");

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.billingAddress = async (req, res) => {
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
      type
    } = req.body;

    const newAddress = {
      user:userId,
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
      type
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
