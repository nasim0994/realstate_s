import { z } from 'zod';

export const onlineNewsValidation = z.object({});

export const updateOnlineNewsValidation = onlineNewsValidation.partial();
