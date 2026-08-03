const asyncHandler = require("../../utils/asyncHandler");
const { updateProduct } = require("../../services/product/updateProduct.service");

exports.updateProduct = asyncHandler(async (req, res) => {
  const product = await updateProduct(
    req.params.id,
    req.body,
    req.files
  );

  return res.status(200).json({
    success: true,
    message: "Product updated successfully",
    product,
  });
});
