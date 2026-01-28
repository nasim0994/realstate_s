import httpStatus from 'http-status';
import { IPhotoGallery } from './photoGalleryInterface';
import QueryBuilder from '../../../builders/QueryBuilder';
import { PhotoGallery } from './photoGalleryModel';
import AppError from '../../../errors/AppError';
import { deleteFile } from '../../../utils/deleteFile';

export const createPhotoGalleryService = async (data: IPhotoGallery) => {
  const result = await PhotoGallery.create(data);
  return result;
};

export const getAllPhotoGalleryService = async (
  query: Record<string, unknown>,
) => {
  const PhotoGalleryQuery = new QueryBuilder(PhotoGallery.find(), query)
    .search(['title'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await PhotoGalleryQuery.countTotal();
  const data = await PhotoGalleryQuery.modelQuery;

  return {
    meta,
    data,
  };
};

export const getByIdPhotoGalleryService = async (id: string) => {
  const result = await PhotoGallery.findById(id);
  return result;
};

export const getBySlugPhotoGalleryService = async (slug: string) => {
  const result = await PhotoGallery.findOne({ slug }).populate('type');
  return result;
};

export const updatePhotoGalleryService = async (
  id: string,
  data: IPhotoGallery,
) => {
  const isExist = await PhotoGallery.findById(id);
  if (!isExist)
    throw new AppError(httpStatus.NOT_FOUND, 'PhotoGallery not found');

  const result = await PhotoGallery.findByIdAndUpdate(id, data, { new: true });
  return result;
};

export const deletePhotoGalleryService = async (id: string) => {
  const isExist = await PhotoGallery.findById(id);
  if (!isExist)
    throw new AppError(httpStatus.NOT_FOUND, 'PhotoGallery not found');

  const result = await PhotoGallery.findByIdAndDelete(id);
  if (result) {
    deleteFile(`./uploads/${isExist?.thumbnail}`);
    if ((isExist?.galleries?.length ?? 0) > 0) {
      isExist?.galleries?.forEach((gallery: string) => {
        deleteFile(`./uploads/${gallery}`);
      });
    }
  }

  return result;
};
