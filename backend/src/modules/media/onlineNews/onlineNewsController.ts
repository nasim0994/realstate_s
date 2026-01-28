import AppError from '../../../errors/AppError';
import { catchAsync } from '../../../utils/catchAsync';
import { deleteFile } from '../../../utils/deleteFile';
import { makeSlug } from '../../../utils/makeSlug';
import {
  addOnlineNewsService,
  deleteOnlineNewsService,
  getAllOnlineNewsService,
  getSingleOnlineNewsService,
  updateOnlineNewsService,
} from './onlineNewsService';

export const addOnlineNewsController = catchAsync(async (req, res, next) => {
  const image: string | undefined = req?.file?.filename;
  if (!image) throw new AppError(httpStatus.NOT_FOUND, 'image is required !');

  try {
    const data = {
      ...req.body,
      slug: makeSlug(req.body.title),
      image: `/onlineNews/${image}`,
    };
    const result = await addOnlineNewsService(data);

    res.status(200).json({
      success: true,
      message: 'OnlineNews add successfully',
      data: result,
    });
  } catch (error) {
    if (image) deleteFile(`./uploads/onlineNews/${image}`);
    next(error);
  }
});

export const getAllOnlineNewsController = catchAsync(async (req, res) => {
  const result = await getAllOnlineNewsService();

  res.status(200).json({
    success: true,
    message: 'OnlineNews get successfully',
    data: result,
  });
});

export const getSingleOnlineNewsController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await getSingleOnlineNewsService(id);

  res.status(200).json({
    success: true,
    message: 'OnlineNews get successfully',
    data: result,
  });
});

export const updateOnlineNewsController = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const image: string | undefined = req?.file?.filename;

  try {
    const data = {
      ...req.body,
      slug: makeSlug(req.body.title),
      image: image ? `/onlineNews/${image}` : undefined,
    };
    const result = await updateOnlineNewsService(id, data);

    res.status(200).json({
      success: true,
      message: 'OnlineNews update successfully',
      data: result,
    });
  } catch (error) {
    if (image) deleteFile(`./uploads/onlineNews/${image}`);
    next(error);
  }
});

export const deleteOnlineNewsController = catchAsync(async (req, res) => {
  const { id } = req.params;
  await deleteOnlineNewsService(id);

  res.status(200).json({
    success: true,
    message: 'OnlineNews delete successfully',
  });
});
