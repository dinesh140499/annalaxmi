const asyncHandler = require("../utils/asyncHandler");
const Products = require("../models/productSchema");
const Category = require("../models/categorySchema");
const ErrorHandler = require("../utils/errorHandler");
const slugify = require("slugify");
const cloudinary = require("cloudinary");

exports.createProduct = asyncHandler(async (req, res, next) => {
  const {
    name,
    category,
    brand,
    description,

    // Pricing
    price,
    discountPrice,

    // Inventory
    stock,
    stockStatus,

    // Specifications
    weight,
    color,
    spec_type,

    // SEO
    metaTitle,
    metaDescription,
    keywords,

    // Product
    tags,
    isFeatured,
    isActive,
  } = req.body;

  // Check category
  const categoryExists = await Category.findById(category);

  if (!categoryExists) {
    return next(new ErrorHandler("Category not found", 404));
  }

  // Generate slug
  const slug = slugify(name, {
    lower: true,
    strict: true,
    trim: true,
  });

  // Duplicate product check
  const existingProduct = await Products.findOne({ slug });

  if (existingProduct) {
    return next(new ErrorHandler("Product already exists", 409));
  }

  // Upload images
  const images = [];

  if (req.files?.length) {
    req.files.forEach((file) => {
      images.push({
        url: file.path,
        public_id: file.filename,
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
      price,
      discountPrice,
    },

    inventory: {
      stock,
      stockStatus,
    },

    specifications: {
      weight,
      color,
      spec_type,
    },

    seo: {
      metaTitle,
      metaDescription,
      keywords,
    },

    tags,

    images,

    rating: {
      average: 0,
      totalReviews: 0,
    },

    isFeatured: isFeatured ?? false,
    isActive: isActive ?? true,
  });

  return res.status(201).json({
    success: true,
    message: "Product created successfully",
    product,
  });
});

exports.getProducts = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  const totalProducts = await Products.countDocuments();

  const products = await Products.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    success: true,
    products,
    pagination: {
      page,
      limit,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
    },
  });
});

exports.getSingleProduct = asyncHandler(async (req, res, next) => {
  const product = await Products.findById({
    _id: req.params.id,
  });

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  return res.status(200).json({
    success: true,
    product,
  });
});

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  console.log(req.params.id);
  const product = await Products.findByIdAndDelete({
    _id: req.params.id,
  });

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  return res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
});

exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await Products.findById(id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const {
    name,
    category,
    brand,
    description,

    // Pricing
    price,
    discountPrice,

    // Inventory
    stock,
    stockStatus,

    // Specifications
    weight,
    color,
    spec_type,

    // SEO
    metaTitle,
    metaDescription,
    keywords,

    // Others
    tags,
    isFeatured,
    isActive,
    removeImages,
  } = req.body; 

  // Category
  if (category) {
    const categoryExists = await Category.findById(category);

    if (!categoryExists) {
      return next(new ErrorHandler("Category not found", 404));
    }

    product.category = category;
  }

  // Name & Slug
  if (name && name !== product.name) {
    const slug = slugify(name, {
      lower: true,
      strict: true,
      trim: true,
    });

    const existing = await Products.findOne({
      slug,
      _id: { $ne: product._id },
    });

    if (existing) {
      return next(new ErrorHandler("Product already exists", 409));
    }

    product.name = name;
    product.slug = slug;
  }

  // Basic Fields
  if (brand !== undefined) product.brand = brand;
  if (description !== undefined) product.description = description;

  // Pricing
  if (price !== undefined) product.pricing.price = Number(price);

  if (discountPrice !== undefined) {
    product.pricing.discountPrice = Number(discountPrice);
  }

  // Inventory
  if (stock !== undefined) product.inventory.stock = Number(stock);

  if (stockStatus !== undefined) {
    product.inventory.stockStatus = stockStatus;
  }

  // Specifications
  if (weight !== undefined) {
    product.specifications.weight = weight;
  }

  if (color !== undefined) {
    product.specifications.color = color;
  }

  if (spec_type !== undefined) {
    product.specifications.spec_type = spec_type;
  }

  // SEO
  if (metaTitle !== undefined) {
    product.seo.metaTitle = metaTitle;
  }

  if (metaDescription !== undefined) {
    product.seo.metaDescription = metaDescription;
  }

  if (keywords !== undefined) {
    product.seo.keywords = keywords;
  }

  // Tags
  if (tags !== undefined) {
    product.tags = tags;
  }

  // Status
  if (isFeatured !== undefined) {
    product.isFeatured = isFeatured;
  }

  if (isActive !== undefined) {
    product.isActive = isActive;
  }

  // Remove Images
  if (removeImages?.length) {
    for (const public_id of removeImages) {
      await cloudinary.uploader.destroy(public_id);
    }

    product.images = product.images.filter(
      (img) => !removeImages.includes(img.public_id)
    );
  }

  // Upload New Images
  if (req.files?.length) {
    const newImages = req.files.map((file) => ({
      url: file.path,
      public_id: file.filename,
    }));

    product.images.push(...newImages);
  }

  await product.save();

  return res.status(200).json({
    success: true,
    message: "Product updated successfully",
    product,
  });
});
