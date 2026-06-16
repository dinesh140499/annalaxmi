const asyncHandler = require("../utils/asyncHandler");
const Products = require("../models/productSchema");
const Category = require("../models/categorySchema");

exports.getProducts = asyncHandler(async (req, res, next) => {
  const products = await Products.find().sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    products,
  });
});

exports.createProduct = asyncHandler(async (req, res, next) => {
  const {
    name,
    category,
    brand,
    description,
    price,
    discountPrice,
    stock,
    stockStatus,
    weight,
    color,
    type,
    tags,
    isFeatured,
  } = req.body;

  const categoryExists = await Category.findById(category);

  if (!categoryExists) {
    return next(new ErrorHandler("Category not found", 404));
  }

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
      type,
    },

    tags: tags
      ? Array.isArray(tags)
        ? tags
        : tags.split(",").map((tag) => tag.trim())
      : [],

    images,

    isFeatured,
    isActive: true,
  });

  return res.status(201).json({
    success: true,
    message: "Product created successfully",
    product,
  });
});

