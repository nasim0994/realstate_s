import { model, Schema } from 'mongoose';
import { IChairmanQuote } from './chairmanQuoteInterface';

const chairmanQuoteSchema = new Schema<IChairmanQuote>({
  image: { type: String, required: true },
  title: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String },
});

export const ChairmanQuote = model<IChairmanQuote>(
  'ChairmanQuote',
  chairmanQuoteSchema,
);
