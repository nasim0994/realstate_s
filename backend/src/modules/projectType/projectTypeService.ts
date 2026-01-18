import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IProjectType } from './projectTypeInterface';
import { ProjectType } from './projectTypeModel';
import { makeSlug } from '../../utils/makeSlug';

export const addProjectTypeService = async (data: IProjectType) => {
  const result = await ProjectType.create({
    ...data,
    slug: makeSlug(data?.name),
  });
  return result;
};

export const getAllProjectTypeService = async () => {
  const result = await ProjectType.find({});
  return result;
};

export const getSingleProjectTypeService = async (id: string) => {
  const result = await ProjectType.findById(id);
  return result;
};

export const updateProjectTypeService = async (
  id: string,
  data: IProjectType,
) => {
  const isExist = await ProjectType.findById(id);
  if (!isExist)
    throw new AppError(httpStatus.NOT_FOUND, 'Project Type not found !');

  const result = await ProjectType.findByIdAndUpdate(
    id,
    {
      ...data,
      slug: makeSlug(data?.name),
    },
    { new: true },
  );
  return result;
};

export const deleteProjectTypeService = async (id: string) => {
  const isExist = await ProjectType.findById(id);
  if (!isExist)
    throw new AppError(httpStatus.NOT_FOUND, 'Project Type not found !');

  await ProjectType.findByIdAndDelete(id);
  return true;
};
