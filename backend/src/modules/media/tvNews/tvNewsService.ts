import httpStatus from 'http-status';
import AppError from '../../../errors/AppError';
import { deleteFile } from '../../../utils/deleteFile';
import { ITvNews } from './tvNewsInterface';
import { TvNews } from './tvNewsModel';

export const addTvNewsService = async (data: ITvNews) => {
  const result = await TvNews.create(data);
  return result;
};

export const getAllTvNewsService = async () => {
  const result = await TvNews.find({});
  return result;
};

export const getSingleTvNewsService = async (id: string) => {
  const result = await TvNews.findById(id);
  return result;
};

export const updateTvNewsService = async (id: string, data: ITvNews) => {
  const isExist = await TvNews.findById(id);
  if (!isExist) throw new AppError(httpStatus.NOT_FOUND, 'TvNews not found !');

  const result = await TvNews.findByIdAndUpdate(id, data, { new: true });
  if (result && data?.image) deleteFile(`./uploads/${isExist?.image}`);
  return result;
};

export const deleteTvNewsService = async (id: string) => {
  const isExist = await TvNews.findById(id);
  if (!isExist) throw new AppError(httpStatus.NOT_FOUND, 'TvNews not found !');

  await TvNews.findByIdAndDelete(id);

  if (isExist.image) deleteFile(`./uploads/${isExist?.image}`);

  return true;
};
