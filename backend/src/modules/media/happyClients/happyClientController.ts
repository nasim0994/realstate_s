import AppError from '../../../errors/AppError';
import { catchAsync } from '../../../utils/catchAsync';
import { deleteFile } from '../../../utils/deleteFile';
import { makeSlug } from '../../../utils/makeSlug';
import {
  addHappyClientService,
  deleteHappyClientService,
  getAllHappyClientService,
  getSingleHappyClientService,
  updateHappyClientService,
} from './happyClientService';

export const addHappyClientController = catchAsync(async (req, res, next) => {
  const image: string | undefined = req?.file?.filename;
  if (!image) throw new AppError(httpStatus.NOT_FOUND, 'image is required !');

  try {
    const data = {
      ...req.body,
      image: `/happyClient/${image}`,
    };
    const result = await addHappyClientService(data);

    res.status(200).json({
      success: true,
      message: 'HappyClient add successfully',
      data: result,
    });
  } catch (error) {
    if (image) deleteFile(`./uploads/happyClient/${image}`);
    next(error);
  }
});

export const getAllHappyClientController = catchAsync(async (req, res) => {
  const { meta, data } = await getAllHappyClientService(req.query);

  res.status(200).json({
    success: true,
    message: 'HappyClient get successfully',
    meta,
    data,
  });
});

export const getSingleHappyClientController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await getSingleHappyClientService(id);

  res.status(200).json({
    success: true,
    message: 'HappyClient get successfully',
    data: result,
  });
});

export const updateHappyClientController = catchAsync(
  async (req, res, next) => {
    const id = req.params.id;
    const image: string | undefined = req?.file?.filename;

    try {
      const data = {
        ...req.body,
        image: image ? `/happyClient/${image}` : undefined,
      };
      const result = await updateHappyClientService(id, data);

      res.status(200).json({
        success: true,
        message: 'HappyClient update successfully',
        data: result,
      });
    } catch (error) {
      if (image) deleteFile(`./uploads/happyClient/${image}`);
      next(error);
    }
  },
);

export const deleteHappyClientController = catchAsync(async (req, res) => {
  const { id } = req.params;
  await deleteHappyClientService(id);

  res.status(200).json({
    success: true,
    message: 'HappyClient delete successfully',
  });
});
