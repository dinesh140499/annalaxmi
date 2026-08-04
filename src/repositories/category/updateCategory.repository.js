const Category = require("../../models/categorySchema");

class UpdateCategoryRepository {
    async update(id, updateData) {
        return await Category.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });
    }
}

module.exports = new UpdateCategoryRepository();
