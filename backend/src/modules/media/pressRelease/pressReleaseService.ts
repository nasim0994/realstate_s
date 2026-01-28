import httpStatus from 'http-status';
import AppError from '../../../errors/AppError';
import { deleteFile } from '../../../utils/deleteFile';
import { IPressRelease } from './pressReleaseInterface';
import { PressRelease } from './pressReleaseModel';

export const addPressReleaseService = async (data: IPressRelease) => {
  const result = await PressRelease.create(data);
  return result;
};

export const getAllPressReleaseService = async () => {
  const result = await PressRelease.find({});
  return result;
};

export const getSinglePressReleaseService = async (id: string) => {
  const result = await PressRelease.findById(id);
  return result;
};

export const updatePressReleaseService = async (
  id: string,
  data: IPressRelease,
) => {
  const isExist = await PressRelease.findById(id);
  if (!isExist)
    throw new AppError(httpStatus.NOT_FOUND, 'PressRelease not found !');

  const result = await PressRelease.findByIdAndUpdate(id, data, { new: true });
  if (result && data?.image) deleteFile(`./uploads/${isExist?.image}`);
  return result;
};

export const deletePressReleaseService = async (id: string) => {
  const isExist = await PressRelease.findById(id);
  if (!isExist)
    throw new AppError(httpStatus.NOT_FOUND, 'PressRelease not found !');

  await PressRelease.findByIdAndDelete(id);

  if (isExist.image) deleteFile(`./uploads/${isExist?.image}`);

  return true;
};
