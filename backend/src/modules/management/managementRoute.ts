import express, { NextFunction, Request, Response } from 'express';
const Router = express.Router();
import { verifyPermission } from '../../middlewares/verifyPermission';
import {
  addManagementController,
  deleteManagementController,
  getAllManagementController,
  getManagementCountController,
  getSingleManagementController,
  updateManagementController,
} from './managementController';
import { fileUploader } from '../../utils/fileUploader';

const { upload, uploadAndConvert } = fileUploader('management');
const uploader = upload.single('image');

Router.post(
  '/add',
  verifyPermission('management', 'create'),
  uploader,
  uploadAndConvert,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
  },
  addManagementController,
);
Router.get('/all', getAllManagementController);
Router.get('/count', getManagementCountController);
Router.get('/:id', getSingleManagementController);
Router.patch(
  '/update/:id',
  verifyPermission('management', 'update'),
  uploader,
  uploadAndConvert,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
  },
  updateManagementController,
);
Router.delete(
  '/delete/:id',
  verifyPermission('management', 'delete'),
  deleteManagementController,
);

export const managementRoute = Router;
