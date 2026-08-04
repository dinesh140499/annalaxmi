const asyncHandler = require("../../utils/asyncHandler");
const { getCategories, getCategoryById } = require("../../services/category/category.read.service");

exports.getCategories = asyncHandler(async (req, res) => {
    const categories = await getCategories();

    res.status(200).json({
        success: true,
        categories,
        categoryCount: categories.length,
    });
});

exports.getCategory = asyncHandler(async (req, res) => {
    const category = await getCategoryById(req.params.id);

    res.status(200).json({
        success: true,
        category,
    });
});
