import { z } from 'zod';

export const contactValidation = z.object({
  title: z.string().min(1, 'Title is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone is required'),
  address: z.string().min(1, 'Address is required'),
  whatsappLink: z.string().url('Invalid WhatsApp link'),
  messengerLink: z.string().url('Invalid Messenger link'),
});

export const updateContactValidation = contactValidation.partial();
