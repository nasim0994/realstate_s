import { z } from 'zod';

export const photoGalleryValidation = z.object({});

export const updatePhotoGalleryValidation = photoGalleryValidation.partial();
