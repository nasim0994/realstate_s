import { model, Schema } from 'mongoose';
import { IAwards } from './awardsInterface';

const awardsSchema = new Schema<IAwards>({
  image: { type: String, required: true },
  title: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String },
  organization: { type: String },
  year: { type: Number },
  order: { type: Number },
});

export const Awards = model<IAwards>('Awards', awardsSchema);
