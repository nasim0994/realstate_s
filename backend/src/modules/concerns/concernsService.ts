import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { makeSlug } from '../../utils/makeSlug';
import { deleteFile } from '../../utils/deleteFile';
import { IConcerns } from './concernsInterface';
import { Concerns } from './concernsModel';

export const addConcernsService = async (data: IConcerns) => {
  const result = await Concerns.create(data);
  return result;
};

export const getAllConcernsService = async () => {
  const result = await Concerns.find({});
  return result;
};

export const getSingleConcernsService = async (id: string) => {
  const result = await Concerns.findById(id);
  return result;
};

export const updateConcernsService = async (id: string, data: IConcerns) => {
  const isExist = await Concerns.findById(id);
  if (!isExist)
    throw new AppError(httpStatus.NOT_FOUND, 'Concerns not found !');

  const result = await Concerns.findByIdAndUpdate(id, data, { new: true });
  if (result && data?.logo) deleteFile(`./uploads/${isExist?.logo}`);
  return result;
};

export const deleteConcernsService = async (id: string) => {
  const isExist = await Concerns.findById(id);
  if (!isExist)
    throw new AppError(httpStatus.NOT_FOUND, 'Concerns not found !');

  await Concerns.findByIdAndDelete(id);

  if (isExist.logo) deleteFile(`./uploads/${isExist?.logo}`);

  return true;
};
