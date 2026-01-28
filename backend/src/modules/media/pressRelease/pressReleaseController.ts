import AppError from '../../../errors/AppError';
import { catchAsync } from '../../../utils/catchAsync';
import { deleteFile } from '../../../utils/deleteFile';
import { makeSlug } from '../../../utils/makeSlug';
import {
  addPressReleaseService,
  deletePressReleaseService,
  getAllPressReleaseService,
  getSinglePressReleaseService,
  updatePressReleaseService,
} from './pressReleaseService';

export const addPressReleaseController = catchAsync(async (req, res, next) => {
  const logo: string | undefined = req?.file?.filename;
  if (!logo) throw new AppError(httpStatus.NOT_FOUND, 'logo is required !');

  try {
    const data = {
      ...req.body,
      slug: makeSlug(req.body.title),
      image: `/pressRelease/${logo}`,
    };
    const result = await addPressReleaseService(data);

    res.status(200).json({
      success: true,
      message: 'PressRelease add successfully',
      data: result,
    });
  } catch (error) {
    if (logo) deleteFile(`./uploads/pressRelease/${logo}`);
    next(error);
  }
});

export const getAllPressReleaseController = catchAsync(async (req, res) => {
  const result = await getAllPressReleaseService();

  res.status(200).json({
    success: true,
    message: 'PressRelease get successfully',
    data: result,
  });
});

export const getSinglePressReleaseController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await getSinglePressReleaseService(id);

  res.status(200).json({
    success: true,
    message: 'PressRelease get successfully',
    data: result,
  });
});

export const updatePressReleaseController = catchAsync(
  async (req, res, next) => {
    const id = req.params.id;
    const logo: string | undefined = req?.file?.filename;

    try {
      const data = {
        ...req.body,
        slug: makeSlug(req.body.title),
        image: logo ? `/pressRelease/${logo}` : undefined,
      };
      const result = await updatePressReleaseService(id, data);

      res.status(200).json({
        success: true,
        message: 'PressRelease update successfully',
        data: result,
      });
    } catch (error) {
      if (logo) deleteFile(`./uploads/pressRelease/${logo}`);
      next(error);
    }
  },
);

export const deletePressReleaseController = catchAsync(async (req, res) => {
  const { id } = req.params;
  await deletePressReleaseService(id);

  res.status(200).json({
    success: true,
    message: 'PressRelease delete successfully',
  });
});
