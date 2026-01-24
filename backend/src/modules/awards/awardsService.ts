import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { deleteFile } from '../../utils/deleteFile';
import { IAwards } from './awardsInterface';
import { Awards } from './awardsModel';

export const addAwardsService = async (data: IAwards) => {
  const result = await Awards.create(data);
  return result;
};

export const getAllAwardsService = async () => {
  const result = await Awards.find({});
  return result;
};

export const getSingleAwardsService = async (id: string) => {
  const result = await Awards.findById(id);
  return result;
};

export const updateAwardsService = async (id: string, data: IAwards) => {
  const isExist = await Awards.findById(id);
  if (!isExist) throw new AppError(httpStatus.NOT_FOUND, 'Awards not found !');

  const result = await Awards.findByIdAndUpdate(id, data, { new: true });
  if (result && data?.image) deleteFile(`./uploads/${isExist?.image}`);
  return result;
};

export const deleteAwardsService = async (id: string) => {
  const isExist = await Awards.findById(id);
  if (!isExist) throw new AppError(httpStatus.NOT_FOUND, 'Awards not found !');

  await Awards.findByIdAndDelete(id);

  if (isExist.image) deleteFile(`./uploads/${isExist?.image}`);

  return true;
};
