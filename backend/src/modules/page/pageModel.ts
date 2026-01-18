import { model, Schema } from 'mongoose';
import { IPage } from './pageInterface';

const pageSchema = new Schema<IPage>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
});

export const Page = model<IPage>('Page', pageSchema);
