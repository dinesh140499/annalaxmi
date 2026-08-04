const productReadRepository = require("./product.read.repository");
const createProductRepository = require("./createProduct.repository");
const updateProductRepository = require("./updateProduct.repository");
const deleteProductRepository = require("./deleteProduct.repository");

module.exports = {
    countDocuments: (query) => productReadRepository.countDocuments(query),
    findWithPagination: (skip, limit, query) => productReadRepository.findWithPagination(skip, limit, query),
    findById: (id) => productReadRepository.findById(id),
    findOne: (query) => productReadRepository.findOne(query),
    create: (data) => createProductRepository.create(data),
    save: (doc) => updateProductRepository.save(doc),
    deleteOne: (doc) => deleteProductRepository.deleteOne(doc),
    findByIdAndDelete: (id) => deleteProductRepository.findByIdAndDelete(id),
};
