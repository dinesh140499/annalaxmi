const categoryRepository = require("../../repositories/category.repository");
const productRepository = require("../../repositories/product.repository");
const ErrorHandler = require("../../utils/errorHandler");
const slugify = require("slugify");

exports.createProduct = async (body, files) => {
    const {
        name,
        category,
        brand,
        description,
        mrp,
        sellingPrice,
        discountPrice,
        stock,
        sold,
        lowStockAlert,
        stockStatus,
        weight,
        color,
        spec_type,
        countryOfOrigin,
        metaTitle,
        metaDescription,
        keywords,
        tags,
        isFeatured,
        isTrending,
        isNewArrival,
        isBestSeller,
        isActive,
    } = body;

    const categoryExists = await categoryRepository.findById(category);

    if (!categoryExists) {
        throw new ErrorHandler("Category not found", 404);
    }

    const slug = slugify(name, {
        lower: true,
        strict: true,
        trim: true,
    });

    const existingProduct = await productRepository.findOne({ slug });

    if (existingProduct) {
        throw new ErrorHandler("Product already exists", 409);
    }

    const images = [];

    if (files?.length) {
        files.forEach((file, index) => {
            images.push({
                url: file.path,
                public_id: file.filename,
                alt: `${name} Image ${index + 1}`,
                isPrimary: index === 0,
            });
        });
    }

    const product = await productRepository.create({
        name,
        slug,
        sku: `ANN-${Date.now()}`,
        category,
        brand,
        description,
        pricing: {
            mrp,
            sellingPrice,
            discountPrice,
        },
        inventory: {
            stock,
            sold: sold ?? 0,
            lowStockAlert: lowStockAlert ?? 5,
            stockStatus,
        },
        specifications: {
            weight,
            color,
            spec_type,
            countryOfOrigin,
        },
        images,
        tags,
        seo: {
            metaTitle,
            metaDescription,
            keywords,
        },
        rating: {
            average: 0,
            totalReviews: 0,
        },
        isFeatured: isFeatured ?? false,
        isTrending: isTrending ?? false,
        isNewArrival: isNewArrival ?? false,
        isBestSeller: isBestSeller ?? false,
        isActive: isActive ?? true,
    });

    return product;
};
