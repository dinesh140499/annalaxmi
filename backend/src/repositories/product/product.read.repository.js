const Products = require("../../models/productSchema");

class ProductReadRepository {
    async countDocuments(query = {}) {
        return await Products.countDocuments(query);
    }

    async findWithPagination(skip, limit, query = {}) {
        return await Products.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
    }

    async findById(id) {
        return await Products.findById(id);
    }

    async findOne(query) {
        return await Products.findOne(query);
    }
}

module.exports = new ProductReadRepository();
