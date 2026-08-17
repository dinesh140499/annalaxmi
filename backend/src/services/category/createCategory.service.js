const categoryRepository = require("../../repositories/category.repository");
const ErrorHandler = require("../../utils/errorHandler");
const slugify = require("slugify");

exports.createCategory = async (body, file) => {
    const { name, slug, description, isActive } = body;

    if (!name) {
        throw new ErrorHandler("Category name is required", 400);
    }

    if (!file) {
        throw new ErrorHandler("Category image is required", 400);
    }

    const existingCategory = await categoryRepository.findOne({ name });

    if (existingCategory) {
        throw new ErrorHandler("Category already exists", 400);
    }

    return await categoryRepository.create({
        name,
        slug: slugify(slug || name, { lower: true, strict: true, trim: true }),
        description: description || "",
        isActive: isActive !== undefined ? (isActive === true || isActive === 'true') : true,
        image: {
            url: file.path,
            public_id: file.filename,
        },
    });
};
