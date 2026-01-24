import AppError from '../../errors/AppError';
import { catchAsync } from '../../utils/catchAsync';
import { deleteFile } from '../../utils/deleteFile';
import { makeSlug } from '../../utils/makeSlug';
import {
  addMoreAboutService,
  deleteMoreAboutService,
  getAllMoreAboutService,
  getSingleMoreAboutService,
  updateMoreAboutService,
} from './moreAboutService';
import httpStatus from 'http-status';

export const addMoreAboutController = catchAsync(async (req, res, next) => {
  const icon: string | undefined = req?.file?.filename;
  console.log(icon);
  if (!icon) throw new AppError(httpStatus.NOT_FOUND, 'Icon is required !');

  try {
    const data = {
      ...req.body,
      slug: makeSlug(req.body.title),
      icon: `/moreAbout/${icon}`,
    };
    const result = await addMoreAboutService(data);

    res.status(200).json({
      success: true,
      message: 'MoreAbout add successfully',
      data: result,
    });
  } catch (error) {
    if (icon) deleteFile(`./uploads/moreAbout/${icon}`);
    next(error);
  }
});

export const getAllMoreAboutController = catchAsync(async (req, res) => {
  const result = await getAllMoreAboutService();

  res.status(200).json({
    success: true,
    message: 'More About get successfully',
    data: result,
  });
});

export const getSingleMoreAboutController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await getSingleMoreAboutService(id);

  res.status(200).json({
    success: true,
    message: 'More About get successfully',
    data: result,
  });
});

export const updateMoreAboutController = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const icon: string | undefined = req?.file?.filename;

  try {
    const data = {
      ...req.body,
      slug: makeSlug(req.body.title),
      icon: icon ? `/moreAbout/${icon}` : undefined,
    };
    const result = await updateMoreAboutService(id, data);

    res.status(200).json({
      success: true,
      message: 'More About update successfully',
      data: result,
    });
  } catch (error) {
    if (icon) deleteFile(`./uploads/moreAbout/${icon}`);
    next(error);
  }
});

export const deleteMoreAboutController = catchAsync(async (req, res) => {
  const { id } = req.params;
  await deleteMoreAboutService(id);

  res.status(200).json({
    success: true,
    message: 'More About delete successfully',
  });
});
