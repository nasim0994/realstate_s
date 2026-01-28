import httpStatus from 'http-status';
import AppError from '../../../errors/AppError';
import { deleteFile } from '../../../utils/deleteFile';
import { INews } from './newsInterface';
import { News } from './newsModel';
import QueryBuilder from '../../../builders/QueryBuilder';

export const addNewsService = async (data: INews) => {
  const result = await News.create(data);
  return result;
};

export const getAllNewsService = async (query: Record<string, unknown>) => {
  const result = new QueryBuilder(News.find(), query)
    .search(['title', 'slug'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await result.countTotal();
  const data = await result.modelQuery;

  return {
    meta,
    data,
  };
};

export const getSingleNewsService = async (id: string) => {
  const result = await News.findById(id);
  return result;
};

export const updateNewsService = async (id: string, data: INews) => {
  const isExist = await News.findById(id);
  if (!isExist) throw new AppError(httpStatus.NOT_FOUND, 'News not found !');

  const result = await News.findByIdAndUpdate(id, data, { new: true });
  if (result && data?.image) deleteFile(`./uploads/${isExist?.image}`);
  return result;
};

export const deleteNewsService = async (id: string) => {
  const isExist = await News.findById(id);
  if (!isExist) throw new AppError(httpStatus.NOT_FOUND, 'News not found !');

  await News.findByIdAndDelete(id);

  if (isExist.image) deleteFile(`./uploads/${isExist?.image}`);

  return true;
};
