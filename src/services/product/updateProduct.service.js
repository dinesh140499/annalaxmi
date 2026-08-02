const categoryRepository = require("../../repositories/category.repository");
const productRepository = require("../../repositories/product.repository");
const ErrorHandler = require("../../utils/errorHandler");
const slugify = require("slugify");
const cloudinary = require("cloudinary");

exports.updateProduct = async (id, body, files) => {
    const product = await productRepository.findById(id);

    if (!product) {
        throw new ErrorHandler("Product not found", 404);
    }

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
        removeImages,
    } = body;

    if (category !== undefined) {
        const categoryExists = await categoryRepository.findById(category);

        if (!categoryExists) {
            throw new ErrorHandler("Category not found", 404);
        }

        product.category = category;
    }

    if (name && name !== product.name) {
        const slug = slugify(name, {
            lower: true,
            strict: true,
            trim: true,
        });

        const existing = await productRepository.findOne({
            slug,
            _id: { $ne: product._id },
        });

        if (existing) {
            throw new ErrorHandler("Product already exists", 409);
        }

        product.name = name;
        product.slug = slug;
    }

    if (brand !== undefined) product.brand = brand;

    if (description !== undefined) {
        product.description = description;
    }

    if (mrp !== undefined) {
        product.pricing.mrp = Number(mrp);
    }

    if (sellingPrice !== undefined) {
        product.pricing.sellingPrice = Number(sellingPrice);
    }

    if (discountPrice !== undefined) {
        product.pricing.discountPrice = Number(discountPrice);
    }

    if (stock !== undefined) {
        product.inventory.stock = Number(stock);
    }

    if (sold !== undefined) {
        product.inventory.sold = Number(sold);
    }

    if (lowStockAlert !== undefined) {
        product.inventory.lowStockAlert = Number(lowStockAlert);
    }

    if (stockStatus !== undefined) {
        product.inventory.stockStatus = stockStatus;
    }

    if (weight !== undefined) {
        product.specifications.weight = weight;
    }

    if (color !== undefined) {
        product.specifications.color = color;
    }

    if (spec_type !== undefined) {
        product.specifications.spec_type = spec_type;
    }

    if (countryOfOrigin !== undefined) {
        product.specifications.countryOfOrigin = countryOfOrigin;
    }

    if (!product.seo) {
        product.seo = {};
    }

    if (metaTitle !== undefined) {
        product.seo.metaTitle = metaTitle;
    }

    if (metaDescription !== undefined) {
        product.seo.metaDescription = metaDescription;
    }

    if (keywords !== undefined) {
        product.seo.keywords = keywords;
    }

    if (tags !== undefined) {
        product.tags = tags;
    }

    if (isFeatured !== undefined) {
        product.isFeatured = isFeatured;
    }

    if (isTrending !== undefined) {
        product.isTrending = isTrending;
    }

    if (isNewArrival !== undefined) {
        product.isNewArrival = isNewArrival;
    }

    if (isBestSeller !== undefined) {
        product.isBestSeller = isBestSeller;
    }

    if (isActive !== undefined) {
        product.isActive = isActive;
    }

    if (removeImages?.length) {
        for (const public_id of removeImages) {
            await cloudinary.uploader.destroy(public_id);
        }

        product.images = product.images.filter(
            (img) => !removeImages.includes(img.public_id)
        );
    }

    if (files?.length) {
        const newImages = files.map((file, index) => ({
            url: file.path,
            public_id: file.filename,
            alt: product.name,
            isPrimary: product.images.length === 0 && index === 0,
        }));

        product.images.push(...newImages);
    }

    await productRepository.save(product);

    return product;
};
