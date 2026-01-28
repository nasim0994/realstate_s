import httpStatus from 'http-status';
import AppError from '../../../errors/AppError';
import { deleteFile } from '../../../utils/deleteFile';
import { IOnlineNews } from './onlineNewsInterface';
import { OnlineNews } from './onlineNewsModel';

export const addOnlineNewsService = async (data: IOnlineNews) => {
  const result = await OnlineNews.create(data);
  return result;
};

export const getAllOnlineNewsService = async () => {
  const result = await OnlineNews.find({});
  return result;
};

export const getSingleOnlineNewsService = async (id: string) => {
  const result = await OnlineNews.findById(id);
  return result;
};

export const updateOnlineNewsService = async (
  id: string,
  data: IOnlineNews,
) => {
  const isExist = await OnlineNews.findById(id);
  if (!isExist)
    throw new AppError(httpStatus.NOT_FOUND, 'OnlineNews not found !');

  const result = await OnlineNews.findByIdAndUpdate(id, data, { new: true });
  if (result && data?.image) deleteFile(`./uploads/${isExist?.image}`);
  return result;
};

export const deleteOnlineNewsService = async (id: string) => {
  const isExist = await OnlineNews.findById(id);
  if (!isExist)
    throw new AppError(httpStatus.NOT_FOUND, 'OnlineNews not found !');

  await OnlineNews.findByIdAndDelete(id);

  if (isExist.image) deleteFile(`./uploads/${isExist?.image}`);

  return true;
};
