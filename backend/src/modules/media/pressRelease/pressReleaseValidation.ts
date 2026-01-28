import { z } from 'zod';

export const pressReleaseValidation = z.object({});

export const updatePressReleaseValidation = pressReleaseValidation.partial();
