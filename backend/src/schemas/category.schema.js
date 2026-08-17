const { z } = require("zod");

const createCategorySchema = z.object({
  name: z
    .string({
      required_error: "Category name is required",
    })
    .trim()
    .min(2, "Category name must be at least 2 characters")
    .max(50, "Category name cannot exceed 50 characters"),
  slug: z.string().trim().optional(),
  description: z.string().trim().max(1000).optional(),
  isActive: z.coerce.boolean().optional().default(true),
});

const updateCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Category name must be at least 2 characters")
    .max(50, "Category name cannot exceed 50 characters")
    .optional(),
  slug: z.string().trim().optional(),
  description: z.string().trim().max(1000).optional(),
  isActive: z.coerce.boolean().optional(),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
};
