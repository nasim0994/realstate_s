import { z } from 'zod';

export const videoGalleryValidation = z.object({});

export const updateVideoGalleryValidation = videoGalleryValidation.partial();
