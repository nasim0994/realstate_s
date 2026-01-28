import { z } from 'zod';

export const happyClientsValidation = z.object({});

export const updateHappyClientsValidation = happyClientsValidation.partial();
