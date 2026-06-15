const asyncHandler = require("../utils/asyncHandler");
const ErrorHandler = require("../utils/errorHandler");

exports.getCategories = asyncHandler((req, res) => {
  res.status(200).json({
    success: true,
    message: "All Products",
  });
});

exports.createCategory = asyncHandler((req, res, next) => {
  const { name, slug, image, isActice } = req.body;

  const fields = [name, slug, image, isActice];
  for(let key of fields){
    return next
  }

  res.status(200).json({
    success: true,
    message: "All Products",
  });
});
