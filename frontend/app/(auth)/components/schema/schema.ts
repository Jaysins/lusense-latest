import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(8, { message: "Password must contain 8 characters" }),
});

export type LoginData = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: "Your name is required" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must contain 8 characters" }),
});

export type RegisterData = z.infer<typeof RegisterSchema>;

export const ForgotPasswordSchema = z.object({
  email: z.string().email(),
});

export type RecoverPasswordData = z.infer<typeof ForgotPasswordSchema>;

export const OtpSchema = z.object({
  otp: z.string().min(6).max(6),
});

export type OtpData = z.infer<typeof OtpSchema>;

export const SetNewPasswordSchema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SetNewPasswordData = z.infer<typeof SetNewPasswordSchema>;
