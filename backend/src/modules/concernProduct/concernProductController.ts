import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import AppError from '../../errors/AppError';
import { deleteFile } from '../../utils/deleteFile';
import {
  addConcernProductService,
  deleteConcernProductService,
  getAllConcernProductService,
  getSingleConcernProductService,
  getConcernProductCountService,
  updateConcernProductService,
} from './concernProductService';

export const addConcernProductController = catchAsync(
  async (req, res, next) => {
    const image: string | undefined = req?.file?.filename;
    if (!image) throw new AppError(httpStatus.NOT_FOUND, 'Image is required !');

    try {
      const data = {
        ...req.body,
        image: `/concernProduct/${image}`,
      };

      const result = await addConcernProductService(data);

      res.status(200).json({
        success: true,
        message: 'ConcernProduct added successfully',
        data: result,
      });
    } catch (error) {
      if (image) deleteFile(`./uploads/concernProduct/${image}`);
      next(error);
    }
  },
);

export const getAllConcernProductController = catchAsync(async (req, res) => {
  const { meta, data } = await getAllConcernProductService(req.query);

  res.status(200).json({
    success: true,
    message: 'ConcernProducts get successfully',
    meta,
    data,
  });
});

export const getSingleConcernProductController = catchAsync(
  async (req, res) => {
    const { id } = req.params;
    const result = await getSingleConcernProductService(id);

    res.status(200).json({
      success: true,
      message: 'ConcernProduct get successfully',
      data: result,
    });
  },
);

export const updateConcernProductController = catchAsync(
  async (req, res, next) => {
    const image: string | undefined = req?.file?.filename;
    const id = req.params.id;

    try {
      const data = {
        ...req.body,
        image: image ? `/concernProduct/${image}` : undefined,
      };

      const result = await updateConcernProductService(id, data);

      res.status(200).json({
        success: true,
        message: 'ConcernProduct update successfully',
        data: result,
      });
    } catch (error) {
      if (image) deleteFile(`./uploads/concernProduct/${image}`);
      next(error);
    }
  },
);

export const deleteConcernProductController = catchAsync(async (req, res) => {
  const { id } = req.params;
  await deleteConcernProductService(id);

  res.status(200).json({
    success: true,
    message: 'ConcernProduct delete successfully',
  });
});

export const getConcernProductCountController = catchAsync(async (req, res) => {
  const result = await getConcernProductCountService();
  res.status(200).json({
    success: true,
    message: 'ConcernProduct count fetched successfully',
    data: result,
  });
});
