const z = require("zod");

const updateAdminRoleSchema = z.object({
  role: z.enum(["user", "admin", "superadmin"]),
});

module.exports = { updateAdminRoleSchema };