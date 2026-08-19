const z = require("zod");

const updateAdminRoleSchema = z.object({
  role: z.enum(
    ["admin", "manager", "editor", "viewer", "user"],
    {
      error: "Please select a valid role.",
    }
  ),
});

const updateAdminStatusSchema = z.object({
  isActive: z.boolean({
    required_error: "isActive is required and must be a boolean",
  }),
});

module.exports = { updateAdminRoleSchema, updateAdminStatusSchema };
