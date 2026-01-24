import { Types } from 'mongoose';

export type IAppointment = {
  name: string;
  phone: string;
  email?: string;
  location: string;
  occupation: string;
  project: Types.ObjectId;
  date: Date;
};
