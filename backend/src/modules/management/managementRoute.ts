import express, { NextFunction, Request, Response } from 'express';
const Router = express.Router();
import { verifyPermission } from '../../middlewares/verifyPermission';
import {
  addManagementController,
  deleteManagementController,
  getAllManagementController,
  getSingleManagementController,
  updateManagementController,
} from './managementController';
import { fileUploader } from '../../utils/fileUploader';

const upload = fileUploader('management').single('image');

Router.post(
  '/add',
  verifyPermission('management', 'create'),
  upload,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
  },
  addManagementController,
);
Router.get('/all', getAllManagementController);
Router.get('/:id', getSingleManagementController);
Router.patch(
  '/update/:id',
  verifyPermission('management', 'update'),
  upload,
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
