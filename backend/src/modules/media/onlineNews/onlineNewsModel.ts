import { model, Schema } from 'mongoose';
import { IOnlineNews } from './onlineNewsInterface';

const onlineNewsSchema = new Schema<IOnlineNews>({
  image: { type: String, required: true },
  title: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String },
  date: { type: String, required: true },
  mediaName: { type: String, required: true },
  newsLink: { type: String },
});

export const OnlineNews = model<IOnlineNews>('OnlineNews', onlineNewsSchema);
