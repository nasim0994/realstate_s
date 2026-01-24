import AppError from '../../errors/AppError';
import { catchAsync } from '../../utils/catchAsync';
import { deleteFile } from '../../utils/deleteFile';
import { makeSlug } from '../../utils/makeSlug';
import {
  addAwardsService,
  deleteAwardsService,
  getAllAwardsService,
  getSingleAwardsService,
  updateAwardsService,
} from './awardsService';

export const addAwardsController = catchAsync(async (req, res, next) => {
  const image: string | undefined = req?.file?.filename;
  if (!image) throw new AppError(httpStatus.NOT_FOUND, 'image is required !');

  try {
    const data = {
      ...req.body,
      slug: makeSlug(req.body.title),
      image: `/awards/${image}`,
    };
    const result = await addAwardsService(data);

    res.status(200).json({
      success: true,
      message: 'Awards add successfully',
      data: result,
    });
  } catch (error) {
    if (image) deleteFile(`./uploads/awards/${image}`);
    next(error);
  }
});

export const getAllAwardsController = catchAsync(async (req, res) => {
  const result = await getAllAwardsService();

  res.status(200).json({
    success: true,
    message: 'Awards get successfully',
    data: result,
  });
});

export const getSingleAwardsController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await getSingleAwardsService(id);

  res.status(200).json({
    success: true,
    message: 'Awards get successfully',
    data: result,
  });
});

export const updateAwardsController = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const image: string | undefined = req?.file?.filename;

  try {
    const data = {
      ...req.body,
      slug: makeSlug(req.body.title),
      image: image ? `/awards/${image}` : undefined,
    };
    const result = await updateAwardsService(id, data);

    res.status(200).json({
      success: true,
      message: 'Awards update successfully',
      data: result,
    });
  } catch (error) {
    if (image) deleteFile(`./uploads/awards/${image}`);
    next(error);
  }
});

export const deleteAwardsController = catchAsync(async (req, res) => {
  const { id } = req.params;
  await deleteAwardsService(id);

  res.status(200).json({
    success: true,
    message: 'Awards delete successfully',
  });
});
