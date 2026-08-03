const categoryRepository = require("../../repositories/category.repository");
const ErrorHandler = require("../../utils/errorHandler");

exports.deleteCategory = async (id) => {
    const category = await categoryRepository.findById(id);

    if (!category) {
        throw new ErrorHandler("Category not found", 404);
    }

    await categoryRepository.delete(id);

    return true;
};
