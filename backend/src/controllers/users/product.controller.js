const { getProducts, getSingleProduct } = require("../product/product.read.controller");
const { updateProduct } = require("../product/updateProduct.controller");
const { deleteProduct, deleteProductPermanently } = require("../product/product.delete.controller");

module.exports = {
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  deleteProductPermanently,
};
