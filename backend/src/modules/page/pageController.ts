import { catchAsync } from '../../utils/catchAsync';
import {
  addPageService,
  deletePageService,
  getAllPageService,
  getSinglePageService,
  updatePageService,
} from './pageService';

export const addPageController = catchAsync(async (req, res) => {
  const result = await addPageService(req.body);

  res.status(200).json({
    success: true,
    message: 'Page add successfully',
    data: result,
  });
});

export const getAllPageController = catchAsync(async (req, res) => {
  const result = await getAllPageService();

  res.status(200).json({
    success: true,
    message: 'Pages get successfully',
    data: result,
  });
});

export const getSinglePageController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await getSinglePageService(id);

  res.status(200).json({
    success: true,
    message: 'Page get successfully',
    data: result,
  });
});

export const updatePageController = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await updatePageService(id, req.body);

  res.status(200).json({
    success: true,
    message: 'Page update successfully',
    data: result,
  });
});

export const deletePageController = catchAsync(async (req, res) => {
  const { id } = req.params;
  await deletePageService(id);

  res.status(200).json({
    success: true,
    message: 'Page delete successfully',
  });
});
