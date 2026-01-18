import { z } from 'zod';

export const projectTypeValidation = z.object({
  name: z.string().min(1, 'Name is required'),
});
