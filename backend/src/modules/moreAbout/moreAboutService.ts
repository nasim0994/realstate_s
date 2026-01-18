import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { makeSlug } from '../../utils/makeSlug';
import mongoose from 'mongoose';
import { IMoreAbout } from './moreAboutInterface';
import { MoreAbout } from './moreAboutModel';
import { deleteFile } from '../../utils/deleteFile';

export const addMoreAboutService = async (data: IMoreAbout) => {
  const result = await MoreAbout.create(data);
  return result;
};

export const getAllMoreAboutService = async () => {
  const result = await MoreAbout.find({});
  return result;
};

export const getSingleMoreAboutService = async (id: string) => {
  const result = await MoreAbout.findById(id);
  return result;
};

export const updateMoreAboutService = async (id: string, data: IMoreAbout) => {
  const isExist = await MoreAbout.findById(id);
  if (!isExist)
    throw new AppError(httpStatus.NOT_FOUND, 'More About not found !');

  const result = await MoreAbout.findByIdAndUpdate(id, data, { new: true });
  if (result && data?.icon) deleteFile(`./uploads/${isExist?.icon}`);
  return result;
};

export const deleteMoreAboutService = async (id: string) => {
  const isExist = await MoreAbout.findById(id);
  if (!isExist)
    throw new AppError(httpStatus.NOT_FOUND, 'More About not found !');

  await MoreAbout.findByIdAndDelete(id);

  if (isExist.icon) deleteFile(`./uploads/${isExist?.icon}`);

  return true;
};
