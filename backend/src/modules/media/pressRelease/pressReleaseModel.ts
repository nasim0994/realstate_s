import { model, Schema } from 'mongoose';
import { IPressRelease } from './pressReleaseInterface';

const pressReleaseSchema = new Schema<IPressRelease>({
  image: { type: String, required: true },
  title: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String },
  date: { type: String, required: true },
  mediaName: { type: String, required: true },
  newsLink: { type: String },
});

export const PressRelease = model<IPressRelease>(
  'PressRelease',
  pressReleaseSchema,
);
