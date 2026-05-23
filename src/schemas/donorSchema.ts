import {
  isValidBangladeshiPhone,
  normalizeBangladeshiPhone,
} from "@/lib/phone";
import { z } from "zod";

const bdPhoneSchema = z
  .string()
  .trim()
  .refine(isValidBangladeshiPhone, {
    message: "Enter a valid Bangladeshi phone number",
  })
  .transform(normalizeBangladeshiPhone);

export const donorCreateSchema = z.object({
  name: z.string().min(2, "Name is required").max(80),
  phone: bdPhoneSchema,
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
  address: z.string().min(3, "Address is required").max(300),
  lastDonate: z.string().optional(),
  note: z.string().max(300).optional(),
});

export const donorUpdateSchema = donorCreateSchema.partial().extend({
  phone: bdPhoneSchema,
  dateOfBirth: z.string().min(1, "Date of birth is required"),
});

export const donorVerifySchema = z.object({
  phone: bdPhoneSchema,
  dateOfBirth: z.string().min(1, "Date of birth is required"),
});
