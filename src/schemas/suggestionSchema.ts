import { z } from "zod";

export const suggestionCreateSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name is required")
    .max(80, "Name is too long"),

  contact: z
    .string()
    .trim()
    .min(3, "Email or phone is required")
    .max(120, "Contact is too long"),

  message: z
    .string()
    .trim()
    .min(5, "Message is too short")
    .max(1000, "Message is too long"),
});