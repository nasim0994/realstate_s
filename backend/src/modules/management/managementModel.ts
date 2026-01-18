import { model, Schema } from 'mongoose';
import { IManagement } from './managementInterface';

const managementSchema = new Schema<IManagement>({
  order: { type: Number, required: true },

  name: { type: String, required: true },
  designation: { type: String, required: true },
  image: { type: String, required: true },

  subTitle: { type: String, required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
});

export const Management = model<IManagement>('Management', managementSchema);
