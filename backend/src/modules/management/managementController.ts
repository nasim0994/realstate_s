import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import AppError from '../../errors/AppError';
import { deleteFile } from '../../utils/deleteFile';
import {
  addManagementService,
  deleteManagementService,
  getAllManagementService,
  getSingleManagementService,
  updateManagementService,
} from './managementService';

export const addManagementController = catchAsync(async (req, res, next) => {
  const image: string | undefined = req?.file?.filename;
  if (!image) throw new AppError(httpStatus.NOT_FOUND, 'Image is required !');

  try {
    const data = {
      ...req.body,
      image: `/management/${image}`,
    };

    const result = await addManagementService(data);

    res.status(200).json({
      success: true,
      message: 'Management add successfully',
      data: result,
    });
  } catch (error) {
    if (image) deleteFile(`./uploads/management/${image}`);
    next(error);
  }
});

export const getAllManagementController = catchAsync(async (req, res) => {
  const { meta, data } = await getAllManagementService(req.query);

  res.status(200).json({
    success: true,
    message: 'Managements get successfully',
    meta,
    data,
  });
});

export const getSingleManagementController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await getSingleManagementService(id);

  res.status(200).json({
    success: true,
    message: 'Management get successfully',
    data: result,
  });
});

export const updateManagementController = catchAsync(async (req, res, next) => {
  const image: string | undefined = req?.file?.filename;
  const id = req.params.id;

  try {
    const data = {
      ...req.body,
      image: image ? `/management/${image}` : undefined,
    };

    const result = await updateManagementService(id, data);

    res.status(200).json({
      success: true,
      message: 'Management update successfully',
      data: result,
    });
  } catch (error) {
    if (image) deleteFile(`./uploads/management/${image}`);
    next(error);
  }
});

export const deleteManagementController = catchAsync(async (req, res) => {
  const { id } = req.params;
  await deleteManagementService(id);

  res.status(200).json({
    success: true,
    message: 'Management delete successfully',
  });
});
