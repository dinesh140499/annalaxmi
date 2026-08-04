const asyncHandler = require("../../utils/asyncHandler");
const { deleteProduct, deleteProductPermanently } = require("../../services/product/product.delete.service");

exports.deleteProduct = asyncHandler(async (req, res) => {
    await deleteProduct(req.params.id);

    res.status(200).json({
        success: true,
        message: "Product deactivated successfully",
    });
});

exports.deleteProductPermanently = asyncHandler(async (req, res) => {
    await deleteProductPermanently(req.params.id);

    res.status(200).json({
        success: true,
        message: "Product deleted permanently",
    });
});
