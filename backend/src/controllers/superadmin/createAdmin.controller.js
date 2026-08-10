const asyncHandler = require("../../utils/asyncHandler");
const { createAdminService } = require("../../services/superadmin/createAdmin.service");

exports.createAdmin = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, phoneNo, role, password } = req.body;

  const admin = await createAdminService({
    firstName,
    lastName,
    email,
    phoneNo,
    role,
    password,
  });

  return res.status(200).json({
    success: true,
    message: "Admin created successfully",
    admin,
  });
});
