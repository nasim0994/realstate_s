import mongoose from 'mongoose';
import { z } from 'zod';

export const userValidation = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  name: z.string().min(1, { message: 'Name is required' }),
  designation: z
    .string()
    .min(1, { message: 'Designation is required' })
    .max(50, { message: 'Designation must be less than 50 characters' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
  role: z
    .string()
    .optional()
    .refine((val) => !val || mongoose.Types.ObjectId.isValid(val), {
      message: 'Invalid rolePermission ObjectId',
    }),
});
