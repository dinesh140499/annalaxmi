const productRepository = require("../../repositories/product.repository");
const ErrorHandler = require("../../utils/errorHandler");
const cloudinary = require("cloudinary");

exports.deleteProduct = async (id) => {
    const product = await productRepository.findById(id);

    if (!product) {
        throw new ErrorHandler("Product not found", 404);
    }

    if (!product.isActive) {
        throw new ErrorHandler("Product is already inactive", 400);
    }

    product.isActive = false;
    await productRepository.save(product);

    return true;
};

exports.deleteProductPermanently = async (id) => {
    const product = await productRepository.findById(id);

    if (!product) {
        throw new ErrorHandler("Product not found", 404);
    }

    if (product.images?.length) {
        await Promise.all(
            product.images.map((image) => {
                if (image.public_id) {
                    return cloudinary.uploader.destroy(image.public_id);
                }
            })
        );
    }

    await productRepository.deleteOne(product);

    return true;
};
