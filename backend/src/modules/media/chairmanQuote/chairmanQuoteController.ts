import AppError from '../../../errors/AppError';
import { catchAsync } from '../../../utils/catchAsync';
import { deleteFile } from '../../../utils/deleteFile';
import { makeSlug } from '../../../utils/makeSlug';
import {
  addChairmanQuoteService,
  deleteChairmanQuoteService,
  getAllChairmanQuoteService,
  getSingleChairmanQuoteService,
  updateChairmanQuoteService,
} from './chairmanQuoteService';

export const addChairmanQuoteController = catchAsync(async (req, res, next) => {
  const logo: string | undefined = req?.file?.filename;
  if (!logo) throw new AppError(httpStatus.NOT_FOUND, 'logo is required !');

  try {
    const data = {
      ...req.body,
      slug: makeSlug(req.body.title),
      image: `/chairmanQuote/${logo}`,
    };
    const result = await addChairmanQuoteService(data);

    res.status(200).json({
      success: true,
      message: 'ChairmanQuote add successfully',
      data: result,
    });
  } catch (error) {
    if (logo) deleteFile(`./uploads/chairmanQuote/${logo}`);
    next(error);
  }
});

export const getAllChairmanQuoteController = catchAsync(async (req, res) => {
  const result = await getAllChairmanQuoteService();

  res.status(200).json({
    success: true,
    message: 'ChairmanQuote get successfully',
    data: result,
  });
});

export const getSingleChairmanQuoteController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await getSingleChairmanQuoteService(id);

  res.status(200).json({
    success: true,
    message: 'ChairmanQuote get successfully',
    data: result,
  });
});

export const updateChairmanQuoteController = catchAsync(
  async (req, res, next) => {
    const id = req.params.id;
    const logo: string | undefined = req?.file?.filename;

    try {
      const data = {
        ...req.body,
        slug: makeSlug(req.body.title),
        image: logo ? `/chairmanQuote/${logo}` : undefined,
      };
      const result = await updateChairmanQuoteService(id, data);

      res.status(200).json({
        success: true,
        message: 'ChairmanQuote update successfully',
        data: result,
      });
    } catch (error) {
      if (logo) deleteFile(`./uploads/chairmanQuote/${logo}`);
      next(error);
    }
  },
);

export const deleteChairmanQuoteController = catchAsync(async (req, res) => {
  const { id } = req.params;
  await deleteChairmanQuoteService(id);

  res.status(200).json({
    success: true,
    message: 'ChairmanQuote delete successfully',
  });
});
