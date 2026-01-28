import AppError from '../../../errors/AppError';
import { catchAsync } from '../../../utils/catchAsync';
import { deleteFile } from '../../../utils/deleteFile';
import { makeSlug } from '../../../utils/makeSlug';
import {
  addVideoGalleryService,
  deleteVideoGalleryService,
  getAllVideoGalleryService,
  getSingleVideoGalleryService,
  updateVideoGalleryService,
} from './videoGalleryService';

export const addVideoGalleryController = catchAsync(async (req, res, next) => {
  const image: string | undefined = req?.file?.filename;
  if (!image) throw new AppError(httpStatus.NOT_FOUND, 'image is required !');

  try {
    const data = {
      ...req.body,
      slug: makeSlug(req.body.title),
      image: `/videoGallery/${image}`,
    };
    const result = await addVideoGalleryService(data);

    res.status(200).json({
      success: true,
      message: 'VideoGallery add successfully',
      data: result,
    });
  } catch (error) {
    if (image) deleteFile(`./uploads/videoGallery/${image}`);
    next(error);
  }
});

export const getAllVideoGalleryController = catchAsync(async (req, res) => {
  const { meta, data } = await getAllVideoGalleryService(req.query);

  res.status(200).json({
    success: true,
    message: 'VideoGallery get successfully',
    meta,
    data,
  });
});

export const getSingleVideoGalleryController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await getSingleVideoGalleryService(id);

  res.status(200).json({
    success: true,
    message: 'VideoGallery get successfully',
    data: result,
  });
});

export const updateVideoGalleryController = catchAsync(
  async (req, res, next) => {
    const id = req.params.id;
    const image: string | undefined = req?.file?.filename;

    try {
      const data = {
        ...req.body,
        slug: makeSlug(req.body.title),
        image: image ? `/videoGallery/${image}` : undefined,
      };
      const result = await updateVideoGalleryService(id, data);

      res.status(200).json({
        success: true,
        message: 'VideoGallery update successfully',
        data: result,
      });
    } catch (error) {
      if (image) deleteFile(`./uploads/videoGallery/${image}`);
      next(error);
    }
  },
);

export const deleteVideoGalleryController = catchAsync(async (req, res) => {
  const { id } = req.params;
  await deleteVideoGalleryService(id);

  res.status(200).json({
    success: true,
    message: 'VideoGallery delete successfully',
  });
});
