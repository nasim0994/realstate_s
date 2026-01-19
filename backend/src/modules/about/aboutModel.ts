import { model, Schema } from 'mongoose';
import { IAbout } from './aboutInterface';

const aboutSchema = new Schema<IAbout>({
  bigImage: { type: String, required: true },
  smallImage: { type: String, required: true },
  title: { type: String, required: true },
  subTitle: { type: String, required: true },
  description: { type: String, required: true },
  ourConcerns: { type: [String] },
});

export const About = model<IAbout>('About', aboutSchema);
