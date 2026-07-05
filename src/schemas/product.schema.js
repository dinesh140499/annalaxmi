const { z } = require("zod");

const createProductSchema = z.object({
  name: z
    .string()
    .min(2, "Product name is required")
    .max(100, "Product name cannot exceed 100 characters")
    .trim(),

  category: z.string().min(1, "Category is required"),

  brand: z.string().optional(),

  description: z.string().min(10, "Description is required").trim(),

  price: z.coerce
    .number({
      required_error: "Price is required",
    })
    .positive("Price must be greater than 0"),

  discountPrice: z.coerce
    .number()
    .nonnegative("Discount price cannot be negative")
    .optional(),

  stock: z.coerce
    .number({
      required_error: "Stock is required",
    })
    .int()
    .min(0, "Stock cannot be negative"),

  stockStatus: z.enum(["Available", "Out Of Stock"], {
    message: "Invalid stock status",
  }),

  weight: z.string().min(1, "Weight is required"),

  color: z.string().optional(),

  spec_type: z.string().min(1, "Specification Type is required"),

  tags: z.preprocess((value) => {

    if (!value) return undefined;

    // If already an array, return it
    if (Array.isArray(value)) {
      return value;
    }

    // If comma-separated string
    if (typeof value === "string") {
      return value
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
    }

    return undefined;
  }, z.array(z.string()).optional()),

  isFeatured: z.coerce.boolean().optional(),
});

// PATCH schema
const updateProductSchema = createProductSchema
  .partial()
  .superRefine((data, ctx) => {

    if (Object.keys(data).length === 0) {
      ctx.addIssue({
        code: "custom",
        message: "At least one field is required",
      });
    }

    if (
      data.price &&
      data.discountPrice &&
      data.discountPrice >= data.price
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["discountPrice"],
        message: "Discount price must be less than price",
      });
    }

  });
  // .refine((data) => Object.keys(data).length > 0, {
  //   message: "At least one field is required for update",
  // })
  

module.exports = {
  createProductSchema,
  updateProductSchema,
};
