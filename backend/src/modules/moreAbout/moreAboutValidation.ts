import { z } from 'zod';

export const moreAboutValidation = z.object({});

export const updateMoreAboutValidation = moreAboutValidation.partial();
