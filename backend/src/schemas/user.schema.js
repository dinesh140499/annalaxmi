const { z } = require("zod");

const userSchema = z.object({
  firstname: z.string().trim().min(1, "First name cannot be blank"),

  lastname: z.string().trim().min(1, "Last name cannot be blank"),

  email: z
    .string()
    .trim()
    .min(1, "Email cannot be blank")
    .email("Invalid email address"),
});

const { setPasswordSchema, changePasswordSchema } = require("./auth.schema");

module.exports = {
  userSchema,
  setPasswordSchema,
  changePasswordSchema,
};


