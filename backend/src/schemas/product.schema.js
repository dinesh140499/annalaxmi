const { z } = require("zod");

// =========================
// Helpers
// =========================

const tagsSchema = z.preprocess((value) => {
  if (!value) return undefined;

  if (Array.isArray(value)) return value;

  if (typeof value === "string") {
    return value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return undefined;
}, z.array(z.string()).optional());

const removeImagesSchema = z.preprocess((value) => {
  if (!value) return undefined;

  if (Array.isArray(value)) return value;

  if (typeof value === "string") {
    return value
      .split(",")
      .map((img) => img.trim())
      .filter(Boolean);
  }

  return undefined;
}, z.array(z.string()).optional());

const keywordsSchema = z.preprocess((value) => {
  if (!value) return [];

  if (Array.isArray(value)) return value;

  if (typeof value === "string") {
    return value
      .split(",")
      .map((keyword) => keyword.trim())
      .filter(Boolean);
  }

  return [];
}, z.array(z.string()).optional());

// =========================
// Base Product Schema
// =========================

const productSchema = z.object({
  // Basic
  name: z
    .string()
    .trim()
    .min(2, "Product name is required")
    .max(100, "Product name cannot exceed 100 characters"),

  category: z.string().min(1, "Category is required"),

  brand: z
    .string()
    .trim()
    .max(50, "Brand cannot exceed 50 characters")
    .optional(),

  description: z
    .string()
    .trim()
    .min(10, "Description is required")
    .max(5000, "Description is too long"),

  // Pricing
  mrp: z.coerce
    .number({
      required_error: "MRP is required",
    })
    .positive("MRP must be greater than 0"),

  sellingPrice: z.coerce
    .number({
      required_error: "Selling price is required",
    })
    .positive("Selling price must be greater than 0"),

  discountPrice: z.coerce
    .number()
    .nonnegative("Discount price cannot be negative")
    .optional(),

  // Inventory
  stock: z.coerce
    .number({
      required_error: "Stock is required",
    })
    .int()
    .min(0, "Stock cannot be negative"),

  sold: z.coerce.number().int().min(0).default(0),

  lowStockAlert: z.coerce.number().int().min(0).default(5),

  stockStatus: z.enum(["Available", "Out Of Stock"]),

  // Specifications
  weight: z.string().min(1, "Weight is required"),

  color: z.string().optional(),

  spec_type: z.string().min(1, "Specification type is required"),

  countryOfOrigin: z.string().optional(),

  // Arrays
  tags: tagsSchema,

  removeImages: removeImagesSchema,

  // Flags
  isFeatured: z.coerce.boolean().default(false),

  isTrending: z.coerce.boolean().default(false),

  isNewArrival: z.coerce.boolean().default(false),

  isBestSeller: z.coerce.boolean().default(false),

  isActive: z.coerce.boolean().default(true),

  // SEO
  metaTitle: z.string().trim().max(70).optional(),

  metaDescription: z.string().trim().max(160).optional(),

  keywords: keywordsSchema,
});



// =========================
// Shared Validation
// =========================

const validateProduct = (data, ctx) => {
  if (
    data.mrp !== undefined &&
    data.sellingPrice !== undefined &&
    data.sellingPrice > data.mrp
  ) {
    ctx.addIssue({
      code: "custom",
      path: ["sellingPrice"],
      message: "Selling price cannot be greater than MRP",
    });
  }

  if (
    data.discountPrice !== undefined &&
    data.sellingPrice !== undefined &&
    data.discountPrice >= data.sellingPrice
  ) {
    ctx.addIssue({
      code: "custom",
      path: ["discountPrice"],
      message: "Discount price must be less than selling price",
    });
  }

  if (data.stock !== undefined && data.stockStatus !== undefined) {
    if (data.stockStatus === "Out Of Stock" && data.stock > 0) {
      ctx.addIssue({
        code: "custom",
        path: ["stockStatus"],
        message:
          'Stock status cannot be "Out Of Stock" when stock is greater than 0',
      });
    }

    if (data.stockStatus === "Available" && data.stock === 0) {
      ctx.addIssue({
        code: "custom",
        path: ["stockStatus"],
        message: 'Stock status should be "Out Of Stock" when stock is 0',
      });
    }
  }
};

// =========================
// Create Schema
// =========================

console.log(productSchema.superRefine())

const createProductSchema = productSchema.superRefine(validateProduct);

// =========================
// Update Schema
// =========================

const updateProductSchema = productSchema.partial().superRefine((data, ctx) => {
  if (Object.keys(data).length === 0) {
    ctx.addIssue({
      code: "custom",
      message: "At least one field is required",
    });
  }

  validateProduct(data, ctx);
});

module.exports = {
  createProductSchema,
  updateProductSchema,
};
