const { z } = require("zod");

const createAddressSchema = z.object({
  firstname: z.string().trim().min(1, "First name is required"),
  lastname: z.string().trim().optional(),
  company_name: z.string().trim().optional(),
  street: z.string().trim().min(1, "Street address is required"),
  city: z.string().trim().min(1, "City is required"),
  state: z.string().trim().min(1, "State is required"),
  country: z.string().trim().min(1, "Country is required"),
  zip_code: z.string().trim().min(1, "Zip code is required"),
  phone: z.string().trim().optional(),
  landmark: z.string().trim().optional(),
  type: z.enum(["home", "office", "other"]).optional().default("home"),
  isDefault: z.boolean().optional(),
});

const updateAddressSchema = z.object({
  firstname: z.string().trim().min(1, "First name cannot be empty").optional(),
  lastname: z.string().trim().optional(),
  company_name: z.string().trim().optional(),
  street: z.string().trim().min(1, "Street address cannot be empty").optional(),
  city: z.string().trim().min(1, "City cannot be empty").optional(),
  state: z.string().trim().min(1, "State cannot be empty").optional(),
  country: z.string().trim().min(1, "Country cannot be empty").optional(),
  zip_code: z.string().trim().min(1, "Zip code cannot be empty").optional(),
  phone: z.string().trim().optional(),
  landmark: z.string().trim().optional(),
  type: z.enum(["home", "office", "other"]).optional(),
  isDefault: z.boolean().optional(),
});

module.exports = {
  createAddressSchema,
  updateAddressSchema,
};
