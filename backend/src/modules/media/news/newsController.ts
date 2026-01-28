import AppError from '../../../errors/AppError';
import { catchAsync } from '../../../utils/catchAsync';
import { deleteFile } from '../../../utils/deleteFile';
import { makeSlug } from '../../../utils/makeSlug';
import {
  addNewsService,
  deleteNewsService,
  getAllNewsService,
  getSingleNewsService,
  updateNewsService,
} from './newsService';

export const addNewsController = catchAsync(async (req, res, next) => {
  const image: string | undefined = req?.file?.filename;
  if (!image) throw new AppError(httpStatus.NOT_FOUND, 'image is required !');

  try {
    const data = {
      ...req.body,
      slug: makeSlug(req.body.title),
      image: `/news/${image}`,
    };
    const result = await addNewsService(data);

    res.status(200).json({
      success: true,
      message: 'News add successfully',
      data: result,
    });
  } catch (error) {
    if (image) deleteFile(`./uploads/news/${image}`);
    next(error);
  }
});

export const getAllNewsController = catchAsync(async (req, res) => {
  const { meta, data } = await getAllNewsService(req.query);

  res.status(200).json({
    success: true,
    message: 'News get successfully',
    meta,
    data,
  });
});

export const getSingleNewsController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await getSingleNewsService(id);

  res.status(200).json({
    success: true,
    message: 'News get successfully',
    data: result,
  });
});

export const updateNewsController = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const image: string | undefined = req?.file?.filename;

  try {
    const data = {
      ...req.body,
      slug: makeSlug(req.body.title),
      image: image ? `/news/${image}` : undefined,
    };
    const result = await updateNewsService(id, data);

    res.status(200).json({
      success: true,
      message: 'News update successfully',
      data: result,
    });
  } catch (error) {
    if (image) deleteFile(`./uploads/news/${image}`);
    next(error);
  }
});

export const deleteNewsController = catchAsync(async (req, res) => {
  const { id } = req.params;
  await deleteNewsService(id);

  res.status(200).json({
    success: true,
    message: 'News delete successfully',
  });
});
