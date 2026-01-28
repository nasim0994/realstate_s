import { model, Schema } from 'mongoose';
import { IConcernProduct } from './concernProductInterface';

const concernProductSchema = new Schema<IConcernProduct>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  concern: {
    type: Schema.Types.ObjectId,
    ref: 'Concerns',
    required: true,
  },
});

export const ConcernProduct = model<IConcernProduct>(
  'ConcernProduct',
  concernProductSchema,
);
