import { model, Schema } from 'mongoose';
import { IConcerns } from './concernsInterface';

const concernsSchema = new Schema<IConcerns>({
  logo: { type: String, required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  content: { type: String },
});

export const Concerns = model<IConcerns>('Concerns', concernsSchema);
