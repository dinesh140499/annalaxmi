const asyncHandler = require("../../utils/asyncHandler");
const Products = require("../../models/productSchema");
const Category = require("../../models/categorySchema");
const ErrorHandler = require("../../utils/errorHandler");
const slugify = require("slugify");
const cloudinary = require("cloudinary");

exports.createProduct = asyncHandler(async (req, res, next) => {
  const {
    // Basic
    name,
    category,
    brand,
    description,

    // Pricing
    mrp,
    sellingPrice,
    discountPrice,

    // Inventory
    stock,
    sold,
    lowStockAlert,
    stockStatus,

    // Specifications
    weight,
    color,
    spec_type,
    countryOfOrigin,

    // SEO
    metaTitle,
    metaDescription,
    keywords,

    // Product
    tags,
    isFeatured,
    isTrending,
    isNewArrival,
    isBestSeller,
    isActive,
  } = req.body;

  // Check Category
  const categoryExists = await Category.findById(category);

  if (!categoryExists) {
    return next(new ErrorHandler("Category not found", 404));
  }

  // Generate Slug
  const slug = slugify(name, {
    lower: true,
    strict: true,
    trim: true,
  });

  // Duplicate Check
  const existingProduct = await Products.findOne({ slug });

  if (existingProduct) {
    return next(new ErrorHandler("Product already exists", 409));
  }

  // Images
  const images = [];

  if (req.files?.length) {
    req.files.forEach((file, index) => {
      images.push({
        url: file.path,
        public_id: file.filename,
        alt: `${name} Image ${index + 1}`,
        isPrimary: index === 0,
      });
    });
  }

  const product = await Products.create({
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

  return res.status(201).json({
    success: true,
    message: "Product created successfully",
    product,
  });
});