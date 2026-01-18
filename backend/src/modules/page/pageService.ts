import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IPage } from './pageInterface';
import { Page } from './pageModel';
import { makeSlug } from '../../utils/makeSlug';
import mongoose from 'mongoose';

export const addPageService = async (data: IPage) => {
  const result = await Page.create({ ...data, slug: makeSlug(data?.title) });
  return result;
};

export const getAllPageService = async () => {
  const result = await Page.find({});
  return result;
};

export const getSinglePageService = async (query: string) => {
  let filter: any = { slug: query };

  if (mongoose.Types.ObjectId.isValid(query)) {
    filter = { $or: [{ _id: query }, { slug: query }] };
  }

  const result = await Page.findOne(filter);
  return result;
};

export const updatePageService = async (id: string, data: IPage) => {
  const isExist = await Page.findById(id);
  if (!isExist) throw new AppError(httpStatus.NOT_FOUND, 'Page not found !');

  const result = await Page.findByIdAndUpdate(
    id,
    { ...data, slug: makeSlug(data?.title) },
    { new: true },
  );
  return result;
};

export const deletePageService = async (id: string) => {
  const isExist = await Page.findById(id);
  if (!isExist) throw new AppError(httpStatus.NOT_FOUND, 'Page not found !');

  await Page.findByIdAndDelete(id);
  return true;
};
