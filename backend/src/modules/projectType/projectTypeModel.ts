import { model, Schema } from 'mongoose';
import { IProjectType } from './projectTypeInterface';
import { Project } from '../project/projectModel';

const projectTypeSchema = new Schema<IProjectType>({
  name: { type: String, required: true },
  slug: { type: String, required: true },
});

projectTypeSchema.pre('findOneAndDelete', async function (next) {
  const categoryId = this.getQuery()._id;

  const projectCount = await Project.countDocuments({ category: categoryId });

  if (projectCount > 0) {
    return next(
      new Error(
        'Cannot delete project type with associated projects. Please delete the projects first.',
      ),
    );
  }

  next();
});

export const ProjectType = model<IProjectType>(
  'ProjectType',
  projectTypeSchema,
);
