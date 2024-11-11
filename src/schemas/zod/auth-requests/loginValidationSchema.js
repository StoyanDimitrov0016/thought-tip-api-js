import { z } from "zod";

const loginValidationSchema = z
  .object({
    username: z
      .string()
      .min(6, "Username must be at least 6 characters long")
      .max(24, "Username must be at most 24 characters long")
      .regex(/^[a-zA-Z0-9_.]+$/, "Username can only contain letters, numbers, underscores, or dots")
      .optional(),
    email: z.string().email().optional(),
    password: z
      .string()
      .min(8)
      .max(64)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  })
  .refine((data) => data.username || data.email, {
    message: "Please provide either a username or an email",
    path: ["username", "email"],
  });

export default loginValidationSchema;
