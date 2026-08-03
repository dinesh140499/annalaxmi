const categoryRepository = require("../../repositories/category.repository");
const ErrorHandler = require("../../utils/errorHandler");

exports.createCategory = async (body, file) => {
    const { name, slug } = body;

    if (!name || !slug) {
        throw new ErrorHandler("All fields are required", 400);
    }

    if (!file) {
        throw new ErrorHandler("Category image is required", 400);
    }

    const existingCategory = await categoryRepository.findOne({
        $or: [{ name }, { slug }],
    });

    if (existingCategory) {
        throw new ErrorHandler("Category already exists", 400);
    }

    return await categoryRepository.create({
        name,
        slug,
        image: {
            url: file.path,
            public_id: file.filename,
        },
    });
};
