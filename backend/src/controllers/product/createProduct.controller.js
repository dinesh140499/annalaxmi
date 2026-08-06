const asyncHandler = require("../../utils/asyncHandler");
const { createProduct } = require("../../services/product/createProduct.service");

exports.createProduct = asyncHandler(async (req, res) => {
  const product = await createProduct(req.body, req.files);

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    product,
  });
});
