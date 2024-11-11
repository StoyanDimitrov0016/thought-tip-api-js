import z from "zod";

const registerValidationSchema = z.object({
  email: z.string().email(),
  username: z
    .string()
    .min(6, "Username must be at least 6 characters long")
    .max(24, "Username must be at most 24 characters long")
    .regex(/^[a-zA-Z0-9_.]+$/, "Username can only contain letters, numbers, underscores, or dots"),
  password: z
    .string()
    .min(8)
    .max(64)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  firstName: z
    .string()
    .min(2)
    .max(30)
    .regex(
      /^[A-Z][a-z'-]+$/,
      "First name must start with a capital letter and can only contain letters, hyphens, or apostrophes"
    ),
  lastName: z
    .string()
    .min(2)
    .max(30)
    .regex(
      /^[A-Z][a-z'-]+$/,
      "Last name must start with a capital letter and can only contain letters, hyphens, or apostrophes"
    ),
});

export default registerValidationSchema;
