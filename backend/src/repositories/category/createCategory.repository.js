const Category = require("../../models/categorySchema");

class CreateCategoryRepository {
    async create(categoryData) {
        return await Category.create(categoryData);
    }
}

module.exports = new CreateCategoryRepository();
