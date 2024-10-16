import { z } from "zod";

const loginValidationSchema = z
  .object({
    username: z.string().optional(),
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
