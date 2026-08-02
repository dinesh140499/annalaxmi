const Products = require("../../models/productSchema");

class CreateProductRepository {
    async create(productData) {
        return await Products.create(productData);
    }
}

module.exports = new CreateProductRepository();
