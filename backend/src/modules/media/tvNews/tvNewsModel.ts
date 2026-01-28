import { model, Schema } from 'mongoose';
import { ITvNews } from './tvNewsInterface';

const tvNewsSchema = new Schema<ITvNews>({
  image: { type: String, required: true },
  title: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String },
  date: { type: String, required: true },
  mediaName: { type: String, required: true },
  newsLink: { type: String },
  videoLink: { type: String, required: true },
});

export const TvNews = model<ITvNews>('TvNews', tvNewsSchema);
