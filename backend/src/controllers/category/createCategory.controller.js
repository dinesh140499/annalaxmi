const asyncHandler = require("../../utils/asyncHandler");
const { createCategory } = require("../../services/category/createCategory.service");

exports.createCategory = asyncHandler(async (req, res) => {
  const category = await createCategory(req.body, req.file);

  res.status(201).json({
    success: true,
    message: "Category created successfully",
    category,
  });
});
