import { z } from 'zod';

export const concernProductValidation = z.object({});

export const updateConcernProductValidation =
  concernProductValidation.partial();
