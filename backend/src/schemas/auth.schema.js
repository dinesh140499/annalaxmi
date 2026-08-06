const { z } = require("zod");

// 📱 phone validation (simple version)
const phoneRegex = /^[0-9]{10,15}$/;

const loginSchema = z.object({
  phoneNo: z.string().regex(phoneRegex, "Phone number must be 10-15 digits"),
  dialCode: z.string().regex(/^[0-9]{1,4}$/, "Invalid dial code"),
  country: z.string().min(2, "Country is required"),
});

const verifyOtpSchema = z.object({
  phoneNo: z.string().regex(phoneRegex, "Invalid phone number"),
  otp: z.string().length(4, "OTP must be 4 digits"),
});

const sendOtpSchema = z.object({
  phoneNo: z.string().regex(phoneRegex, "Phone number must be 10-15 digits"),
  dialCode: z.string().regex(/^[0-9]{1,4}$/, "Invalid dial code"),
  country: z.string().min(2, "Country is required"),
});

const loginWithPasswordSchema = z
  .object({
    phoneNo: z.string().regex(phoneRegex, "Invalid phone number").optional(),
    email: z.string().trim().email("Invalid email address").optional(),
    password: z.string().min(1, "Password is required"),
  })
  .refine((data) => data.phoneNo || data.email, {
    message: "Either phone number or email is required",
    path: ["phoneNo"],
  });

const forgotPasswordSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .trim()
    .email("Invalid email address"),
});

const resetPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
});

module.exports = {
  loginSchema,
  sendOtpSchema,
  verifyOtpSchema,
  loginWithPasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
};
