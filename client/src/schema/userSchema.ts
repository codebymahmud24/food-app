import { z } from "zod";

// Registration form validation schema
export const registerSchema = z
  .object({
    fullName: z.string().min(2, "Full Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm Password is required"),
    contactNumber: z.string().min(10, "Contact Number is required"),
    address: z.string().min(5, "Address is required"),
    termsAccepted: z
      .boolean()
      .refine((val) => val === true, {
        message: "You must accept Terms & Conditions",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export type LoginFormData = z.infer<typeof loginSchema>;