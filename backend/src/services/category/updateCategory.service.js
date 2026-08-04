const categoryRepository = require("../../repositories/category.repository");
const ErrorHandler = require("../../utils/errorHandler");

exports.updateCategory = async (id, body, file) => {
    const { name, slug } = body;

    const category = await categoryRepository.findById(id);
    if (!category) {
        throw new ErrorHandler("Category not found", 404);
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (slug) updateData.slug = slug;
    if (file) {
        updateData.image = {
            url: file.path,
            public_id: file.filename,
        };
    }

    return await categoryRepository.update(id, updateData);
};
