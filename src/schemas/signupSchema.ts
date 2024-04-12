import { z } from "zod";

export const usernameValidation = z.string().toLowerCase().trim().min(2);

export const signupSchema = z.object({
    username: usernameValidation,
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Minimum 8 characters" }),
});
