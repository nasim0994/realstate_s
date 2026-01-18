import { z } from 'zod';

export const aboutValidation = z.object({
  title: z.string().min(1, 'Title is required'),
  subTitle: z.string().min(1, 'Subtitle is required'),
  description: z.string().min(1, 'Description is required'),
});

export const updateAboutValidation = aboutValidation.partial();
