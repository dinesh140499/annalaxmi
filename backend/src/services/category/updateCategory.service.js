const categoryRepository = require("../../repositories/category.repository");
const ErrorHandler = require("../../utils/errorHandler");
const slugify = require("slugify");

exports.updateCategory = async (id, body, file) => {
    const { name, slug, description, isActive } = body;

    const category = await categoryRepository.findById(id);
    if (!category) {
        throw new ErrorHandler("Category not found", 404);
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (slug || name) {
        updateData.slug = slugify(slug || name, { lower: true, strict: true, trim: true });
    }
    if (description !== undefined) {
        updateData.description = description;
    }
    if (isActive !== undefined) {
        updateData.isActive = isActive === true || isActive === 'true';
    }
    if (file) {
        updateData.image = {
            url: file.path,
            public_id: file.filename,
        };
    }

    return await categoryRepository.update(id, updateData);
};
