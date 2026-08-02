const asyncHandler = require("../../utils/asyncHandler");
const { deleteCategory } = require("../../services/category/category.delete.service");

exports.deleteCategory = asyncHandler(async (req, res) => {
    await deleteCategory(req.params.id);

    res.status(200).json({
        success: true,
        message: "Category deleted successfully",
    });
});
