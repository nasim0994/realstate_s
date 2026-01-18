import { z } from 'zod';

export const projectValidation = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  type: z.string().min(1, 'Type is required'),
  status: z.enum(['ongoing', 'upcoming', 'completed'], {
    required_error: 'Status is required',
  }),
  location: z.string().min(1, 'Location is required'),
  landArea: z.string().min(1, 'Land Area is required'),
  facing: z.string().min(1, 'Facing is required'),
  storied: z.string().min(1, 'Storied is required'),
  layout: z.string().min(1, 'Layout is required'),
  aptSize: z.string().min(1, 'Apartment Size is required'),
  handoverDate: z.string().min(1, 'Handover Date is required'),
  googleMapEmbedLink: z.string().min(1, 'Google Map Embed Link is required'),
});

export const updateProjectValidation = projectValidation.partial();
