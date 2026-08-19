const z = require("zod");

const updateAdminRoleSchema = z.object({
  role: z.enum(
    ["admin", "manager", "editor", "viewer", "user"],
    {
      error: "Please select a valid role.",
    }
  ),
});

module.exports = { updateAdminRoleSchema };
