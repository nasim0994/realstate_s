import { z } from 'zod';

export const concernsValidation = z.object({});

export const updateConcernsValidation = concernsValidation.partial();
