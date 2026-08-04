const Category = require("../../models/categorySchema");

class CategoryReadRepository {
    async findById(id) {
        return await Category.findById(id);
    }

    async findOne(query) {
        return await Category.findOne(query);
    }

    async find(query = {}) {
        return await Category.find(query).sort({ createdAt: -1 });
    }
}

module.exports = new CategoryReadRepository();
