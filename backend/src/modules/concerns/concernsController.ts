import AppError from '../../errors/AppError';
import { catchAsync } from '../../utils/catchAsync';
import { deleteFile } from '../../utils/deleteFile';
import { makeSlug } from '../../utils/makeSlug';
import {
  addConcernsService,
  deleteConcernsService,
  getAllConcernsService,
  getSingleConcernsService,
  updateConcernsService,
} from './concernsService';

export const addConcernsController = catchAsync(async (req, res, next) => {
  const logo: string | undefined = req?.file?.filename;
  if (!logo) throw new AppError(httpStatus.NOT_FOUND, 'logo is required !');

  try {
    const data = {
      ...req.body,
      slug: makeSlug(req.body.name),
      logo: `/concerns/${logo}`,
    };
    const result = await addConcernsService(data);

    res.status(200).json({
      success: true,
      message: 'Concerns add successfully',
      data: result,
    });
  } catch (error) {
    if (logo) deleteFile(`./uploads/concerns/${logo}`);
    next(error);
  }
});

export const getAllConcernsController = catchAsync(async (req, res) => {
  const result = await getAllConcernsService();

  res.status(200).json({
    success: true,
    message: 'Concerns get successfully',
    data: result,
  });
});

export const getSingleConcernsController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await getSingleConcernsService(id);

  res.status(200).json({
    success: true,
    message: 'Concerns get successfully',
    data: result,
  });
});

export const updateConcernsController = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const logo: string | undefined = req?.file?.filename;

  try {
    const data = {
      ...req.body,
      slug: makeSlug(req.body.name),
      logo: logo ? `/concerns/${logo}` : undefined,
    };
    const result = await updateConcernsService(id, data);

    res.status(200).json({
      success: true,
      message: 'Concerns update successfully',
      data: result,
    });
  } catch (error) {
    if (logo) deleteFile(`./uploads/concerns/${logo}`);
    next(error);
  }
});

export const deleteConcernsController = catchAsync(async (req, res) => {
  const { id } = req.params;
  await deleteConcernsService(id);

  res.status(200).json({
    success: true,
    message: 'Concerns delete successfully',
  });
});
