import { model, Schema } from 'mongoose';
import { IProjectType } from './projectTypeInterface';

const projectTypeSchema = new Schema<IProjectType>({
  name: { type: String, required: true },
  slug: { type: String, required: true },
});

export const ProjectType = model<IProjectType>(
  'ProjectType',
  projectTypeSchema,
);
