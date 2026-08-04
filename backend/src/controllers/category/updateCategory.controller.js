const asyncHandler = require("../../utils/asyncHandler");
const { updateCategory } = require("../../services/category/updateCategory.service");

exports.updateCategory = asyncHandler(async (req, res) => {
  const category = await updateCategory(
    req.params.id,
    req.body,
    req.file
  );

  res.status(200).json({
    success: true,
    message: "Category updated successfully",
    category,
  });
});
