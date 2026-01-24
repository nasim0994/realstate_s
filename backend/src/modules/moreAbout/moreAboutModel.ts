import { model, Schema } from 'mongoose';
import { IMoreAbout } from './moreAboutInterface';

const moreAboutSchema = new Schema<IMoreAbout>({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
});

export const MoreAbout = model<IMoreAbout>('MoreAbout', moreAboutSchema);
