const { z } = require("zod");

const productSchema = z.object({
  name: z
    .string()
    .min(2, "Product name is required")
    .max(100, "Product name cannot exceed 100 characters")
    .trim(),

  category: z.string().min(1, "Category is required"),

  brand: z.string().optional(),

  description: z.string().min(10, "Description is required").trim(),

  price: z
    .number({
      required_error: "Price is required",
    })
    .positive("Price must be greater than 0"),

  discountPrice: z
    .number()
    .nonnegative("Discount price cannot be negative")
    .optional(),

  stock: z
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

  type: z.string().min(1, "Type is required"),

  tags: z.array(z.string()).optional(),

  isFeatured: z.coerce.boolean().optional(),
});

module.exports = { productSchema };
