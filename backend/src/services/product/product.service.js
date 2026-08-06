const { createProduct } = require("./createProduct.service");
const { getProducts, getSingleProduct } = require("./product.read.service");
const { updateProduct } = require("./updateProduct.service");
const { deleteProduct, deleteProductPermanently } = require("./product.delete.service");

module.exports = {
    create: createProduct,
    createProduct,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    deleteProductPermanently,
};