const asyncHandler = require("../../utils/asyncHandler");
const { getProducts, getSingleProduct } = require("../../services/product/product.read.service");

exports.getProducts = asyncHandler(async (req, res) => {
    const data = await getProducts(req.query);

    res.status(200).json({
        success: true,
        products: data.products,
        pagination: data.pagination,
    });
});

exports.getSingleProduct = asyncHandler(async (req, res) => {
    const product = await getSingleProduct(req.params.id);

    return res.status(200).json({
        success: true,
        product,
    });
});
