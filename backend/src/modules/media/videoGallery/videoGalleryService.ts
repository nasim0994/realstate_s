import httpStatus from 'http-status';
import AppError from '../../../errors/AppError';
import { deleteFile } from '../../../utils/deleteFile';
import QueryBuilder from '../../../builders/QueryBuilder';
import { IVideoGallery } from './videoGalleryInterface';
import { VideoGallery } from './videoGalleryModel';

export const addVideoGalleryService = async (data: IVideoGallery) => {
  const result = await VideoGallery.create(data);
  return result;
};

export const getAllVideoGalleryService = async (
  query: Record<string, unknown>,
) => {
  const result = new QueryBuilder(VideoGallery.find(), query)
    .search(['title'])
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

export const getSingleVideoGalleryService = async (id: string) => {
  const result = await VideoGallery.findById(id);
  return result;
};

export const updateVideoGalleryService = async (
  id: string,
  data: IVideoGallery,
) => {
  const isExist = await VideoGallery.findById(id);
  if (!isExist)
    throw new AppError(httpStatus.NOT_FOUND, 'VideoGallery not found !');

  const result = await VideoGallery.findByIdAndUpdate(id, data, { new: true });
  if (result && data?.image) deleteFile(`./uploads/${isExist?.image}`);
  return result;
};

export const deleteVideoGalleryService = async (id: string) => {
  const isExist = await VideoGallery.findById(id);
  if (!isExist)
    throw new AppError(httpStatus.NOT_FOUND, 'VideoGallery not found !');

  await VideoGallery.findByIdAndDelete(id);

  if (isExist.image) deleteFile(`./uploads/${isExist?.image}`);

  return true;
};
