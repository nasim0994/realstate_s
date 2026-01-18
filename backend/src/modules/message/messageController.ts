import { catchAsync } from '../../utils/catchAsync';
import {
  addMessageService,
  deleteMessageService,
  getAllMessageService,
  getSingleMessageService,
  updateMessageService,
} from './messageService';

export const addMessageController = catchAsync(async (req, res) => {
  const result = await addMessageService(req.body);

  res.status(200).json({
    success: true,
    message: 'Message add successfully',
    data: result,
  });
});

export const getAllMessageController = catchAsync(async (req, res) => {
  const result = await getAllMessageService();

  res.status(200).json({
    success: true,
    message: 'Messages get successfully',
    data: result,
  });
});

export const getSingleMessageController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await getSingleMessageService(id);

  res.status(200).json({
    success: true,
    message: 'Message get successfully',
    data: result,
  });
});

export const updateMessageController = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await updateMessageService(id, req.body);

  res.status(200).json({
    success: true,
    message: 'Message update successfully',
    data: result,
  });
});

export const deleteMessageController = catchAsync(async (req, res) => {
  const { id } = req.params;
  await deleteMessageService(id);

  res.status(200).json({
    success: true,
    message: 'Message delete successfully',
  });
});
