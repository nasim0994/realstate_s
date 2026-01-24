import { z } from 'zod';

export const appointmentValidation = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(1, 'Phone is required'),
  location: z.string().min(1, 'Location is required'),
  occupation: z.string().min(1, 'Occupation is required'),
  project: z.string().min(1, 'Project ID is required'),
  date: z.string().min(1, 'Date is required'),
});

export const updateAppointmentValidation = appointmentValidation.partial();
