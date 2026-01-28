import { model, Schema } from 'mongoose';
import { IHappyClient } from './happyClientInterface';

const happyClientSchema = new Schema<IHappyClient>({
  image: { type: String, required: true },
  review: { type: String, required: true },
  videoLink: { type: String, required: true },
  rating: { type: Number, required: true },
  name: { type: String, required: true },
  profession: { type: String, required: true },
});

export const HappyClient = model<IHappyClient>(
  'HappyClient',
  happyClientSchema,
);
