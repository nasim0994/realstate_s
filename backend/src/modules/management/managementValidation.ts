import { z } from 'zod';

export const managementValidation = z.object({
  order: z.number().min(1),

  name: z.string().min(1, 'Name is required'),
  designation: z.string().min(1, 'Designation is required'),
  image: z.string().min(1, 'Image is required'),

  subTitle: z.string().min(1, 'SubTitle is required'),
  title: z.string().min(1, 'Title is required'),
  message: z.string().min(1, 'Message is required'),
});

export const updateManagementValidation = managementValidation.partial();
