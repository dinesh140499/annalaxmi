const Category = require("../../models/categorySchema");

class DeleteCategoryRepository {
    async delete(id) {
        return await Category.findByIdAndDelete(id);
    }
}

module.exports = new DeleteCategoryRepository();
