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

const setPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string({ required_error: "Confirm password is required" })
      .min(1, "Confirm password cannot be blank"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
    confirmPassword: z
      .string({ required_error: "Confirm password is required" })
      .min(1, "Confirm password cannot be blank"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

module.exports = {
  userSchema,
  setPasswordSchema,
  changePasswordSchema,
};

