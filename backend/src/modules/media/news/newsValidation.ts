import { z } from 'zod';

export const newsValidation = z.object({});

export const updateNewsValidation = newsValidation.partial();
