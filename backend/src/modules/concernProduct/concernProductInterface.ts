import { Types } from 'mongoose';

export type IConcernProduct = {
  title: string;
  description: string;
  image: string;
  concern: Types.ObjectId;
};
