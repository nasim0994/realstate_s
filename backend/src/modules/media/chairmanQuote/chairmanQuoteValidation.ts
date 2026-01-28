import { z } from 'zod';

export const chairmanQuoteValidation = z.object({});

export const updateChairmanQuoteValidation = chairmanQuoteValidation.partial();
