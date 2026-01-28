import { z } from 'zod';

export const tvNewsValidation = z.object({});

export const updateTvNewsValidation = tvNewsValidation.partial();
