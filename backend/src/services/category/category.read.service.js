const categoryRepository = require("../../repositories/category.repository");
const ErrorHandler = require("../../utils/errorHandler");

exports.getCategories = async () => {
    return await categoryRepository.find();
};

exports.getCategoryById = async (id) => {
    const category = await categoryRepository.findById(id);
    if (!category) {
        throw new ErrorHandler("Category not found", 404);
    }
    return category;
};
