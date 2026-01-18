import { catchAsync } from '../../utils/catchAsync';
import {
  addProjectTypeService,
  deleteProjectTypeService,
  getAllProjectTypeService,
  getSingleProjectTypeService,
  updateProjectTypeService,
} from './projectTypeService';

export const addProjectTypeController = catchAsync(async (req, res) => {
  const result = await addProjectTypeService(req.body);

  res.status(200).json({
    success: true,
    message: 'Project Type add successfully',
    data: result,
  });
});

export const getAllProjectTypeController = catchAsync(async (req, res) => {
  const result = await getAllProjectTypeService();

  res.status(200).json({
    success: true,
    message: 'Project Types get successfully',
    data: result,
  });
});

export const getSingleProjectTypeController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await getSingleProjectTypeService(id);

  res.status(200).json({
    success: true,
    message: 'Project Type get successfully',
    data: result,
  });
});

export const updateProjectTypeController = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await updateProjectTypeService(id, req.body);

  res.status(200).json({
    success: true,
    message: 'Project Type update successfully',
    data: result,
  });
});

export const deleteProjectTypeController = catchAsync(async (req, res) => {
  const { id } = req.params;
  await deleteProjectTypeService(id);

  res.status(200).json({
    success: true,
    message: 'Project Type delete successfully',
  });
});
