const asyncHandler = require("../../utils/asyncHandler");
const ErrorHandler = require("../../utils/errorHandler");
const Categories = require("../../models/categorySchema");

exports.getCategories = asyncHandler(async (req, res) => {
  const categories = await Categories.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    categories,
    categoryCount: categories.length,
  });
});

exports.getCategory = asyncHandler(async (req, res, next) => {
  const category = await Categories.findById(req.params.id);

  if (!category) {
    return next(new ErrorHandler("Category not found", 404));
  }

  res.status(200).json({
    success: true,
    category,
  });
});

exports.createCategory = asyncHandler(async (req, res, next) => {
  const { name, slug } = req.body;

  if (!name || !slug) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  if (!req.file) {
    return next(new ErrorHandler("Category image is required", 400));
  }

  const existingCategory = await Categories.findOne({
    $or: [{ name }, { slug }],
  });

  if (existingCategory) {
    return next(new ErrorHandler("Category already exists", 400));
  }

  const category = await Categories.create({
    name,
    slug,
    image: { url: req.file?.path, public_id: req.file?.filename }, // Cloudinary URL
  });

  res.status(201).json({
    success: true,
    message: "Category created successfully",
    category,
  });
});

exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { name, slug } = req.body;

  const category = await Categories.findBydId(req.params.id);

  if (!category) {
    return next(new ErrorHandler("Category not found", 404));
  }

  category.name = name;
  category.slug = slug;

  if (req.file) {
    ((category.url = req.file?.url), (category.public_id = req.file?.filename));
  }

  await category.save();

  res.status(200).json({
    success: true,
    message: "Category updated successfully",
    category,
  });
});

exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Categories.findById(req.params.id);

  if (!category) {
    return next(new ErrorHandler("Category not found", 404));
  }

  await category.deleteOne();

  res.status(200).json({
    success: true,
    message: "Category deleted successfully",
  });
});
