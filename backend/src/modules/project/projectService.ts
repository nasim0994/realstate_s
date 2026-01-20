import httpStatus from 'http-status';
import { IProject } from './projectInterface';
import QueryBuilder from '../../builders/QueryBuilder';
import { Project } from './projectModel';
import AppError from '../../errors/AppError';
import { deleteFile } from '../../utils/deleteFile';

export const createProjectService = async (data: IProject) => {
  const result = await Project.create(data);
  return result;
};

export const getAllProjectService = async (query: Record<string, unknown>) => {
  const ProjectQuery = new QueryBuilder(
    Project.find().populate(
      'category subCategory subSubCategory',
      'name icon slug',
    ),
    query,
  )
    .search(['title'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await ProjectQuery.countTotal();
  const data = await ProjectQuery.modelQuery;

  return {
    meta,
    data,
  };
};

export const getByIdProjectService = async (id: string) => {
  const result = await Project.findById(id).populate('type', 'name icon slug');
  return result;
};

export const getBySlugProjectService = async (slug: string) => {
  const result = await Project.findOne({ slug }).populate(
    'type',
    'name icon slug',
  );
  return result;
};

export const updateProjectService = async (id: string, data: IProject) => {
  const isExist = await Project.findById(id);
  if (!isExist) throw new AppError(httpStatus.NOT_FOUND, 'Project not found');

  const result = await Project.findByIdAndUpdate(id, data, { new: true });
  return result;
};

export const deleteProjectService = async (id: string) => {
  const isExist = await Project.findById(id);
  if (!isExist) throw new AppError(httpStatus.NOT_FOUND, 'Project not found');

  const result = await Project.findByIdAndDelete(id);
  if (result) {
    deleteFile(`./uploads/${isExist?.thumbnail}`);
    if ((isExist?.galleries?.length ?? 0) > 0) {
      isExist?.galleries?.forEach((gallery: string) => {
        deleteFile(`./uploads/${gallery}`);
      });
    }
  }

  return result;
};

export const updateProjectFeatureService = async (id: string) => {
  const isExist = await Project.findById(id);
  if (!isExist) throw new AppError(httpStatus.NOT_FOUND, 'Project not found');

  const result = await Project.findByIdAndUpdate(id, {
    isFeatured: !isExist.isFeatured,
  });
  return result;
};

export const updateProjectActiveService = async (id: string) => {
  const isExist = await Project.findById(id);
  if (!isExist) throw new AppError(httpStatus.NOT_FOUND, 'Project not found');

  const result = await Project.findByIdAndUpdate(id, {
    isActive: !isExist.isActive,
  });
  return result;
};

// project count service - totalProject, & status('ongoing' | 'upcoming' | 'completed') wise count
export const getProjectCountService = async () => {
  const totalProject = await Project.countDocuments();
  const ongoingProject = await Project.countDocuments({ status: 'ongoing' });
  const upcomingProject = await Project.countDocuments({ status: 'upcoming' });
  const completedProject = await Project.countDocuments({
    status: 'completed',
  });
  return {
    totalProject,
    ongoingProject,
    upcomingProject,
    completedProject,
  };
};
