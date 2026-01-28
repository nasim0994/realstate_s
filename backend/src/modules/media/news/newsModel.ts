import { model, Schema } from 'mongoose';
import { INews } from './newsInterface';

const onlineNewsSchema = new Schema<INews>({
  image: { type: String, required: true },
  title: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String },
  date: { type: String, required: true },
  mediaName: { type: String, required: true },
  newsLink: { type: String },
  videoLink: { type: String },
  type: { type: String, required: true, enum: ['online', 'tv', 'press'] },
});

export const News = model<INews>('News', onlineNewsSchema);
