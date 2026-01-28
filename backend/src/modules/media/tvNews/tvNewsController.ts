import AppError from '../../../errors/AppError';
import { catchAsync } from '../../../utils/catchAsync';
import { deleteFile } from '../../../utils/deleteFile';
import { makeSlug } from '../../../utils/makeSlug';
import {
  addTvNewsService,
  deleteTvNewsService,
  getAllTvNewsService,
  getSingleTvNewsService,
  updateTvNewsService,
} from './tvNewsService';

export const addTvNewsController = catchAsync(async (req, res, next) => {
  const logo: string | undefined = req?.file?.filename;
  if (!logo) throw new AppError(httpStatus.NOT_FOUND, 'logo is required !');

  try {
    const data = {
      ...req.body,
      slug: makeSlug(req.body.title),
      image: `/tvNews/${logo}`,
    };
    const result = await addTvNewsService(data);

    res.status(200).json({
      success: true,
      message: 'TvNews add successfully',
      data: result,
    });
  } catch (error) {
    if (logo) deleteFile(`./uploads/tvNews/${logo}`);
    next(error);
  }
});

export const getAllTvNewsController = catchAsync(async (req, res) => {
  const result = await getAllTvNewsService();

  res.status(200).json({
    success: true,
    message: 'TvNews get successfully',
    data: result,
  });
});

export const getSingleTvNewsController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await getSingleTvNewsService(id);

  res.status(200).json({
    success: true,
    message: 'TvNews get successfully',
    data: result,
  });
});

export const updateTvNewsController = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const logo: string | undefined = req?.file?.filename;

  try {
    const data = {
      ...req.body,
      slug: makeSlug(req.body.title),
      image: logo ? `/tvNews/${logo}` : undefined,
    };
    const result = await updateTvNewsService(id, data);

    res.status(200).json({
      success: true,
      message: 'TvNews update successfully',
      data: result,
    });
  } catch (error) {
    if (logo) deleteFile(`./uploads/tvNews/${logo}`);
    next(error);
  }
});

export const deleteTvNewsController = catchAsync(async (req, res) => {
  const { id } = req.params;
  await deleteTvNewsService(id);

  res.status(200).json({
    success: true,
    message: 'TvNews delete successfully',
  });
});
