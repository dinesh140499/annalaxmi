const productRepository = require("../../repositories/product.repository");
const ErrorHandler = require("../../utils/errorHandler");

exports.getProducts = async (queryParams) => {
    const page = Number(queryParams.page) || 1;
    const limit = Number(queryParams.limit) || 10;
    const skip = (page - 1) * limit;

    const totalProducts = await productRepository.countDocuments();
    const products = await productRepository.findWithPagination(skip, limit);

    return {
        products,
        pagination: {
            page,
            limit,
            totalProducts,
            totalPages: Math.ceil(totalProducts / limit),
        },
    };
};

exports.getSingleProduct = async (id) => {
    const product = await productRepository.findById(id);

    if (!product) {
        throw new ErrorHandler("Product Not Found", 404);
    }

    return product;
};
