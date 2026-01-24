import express, { NextFunction, Request, Response } from 'express';
const Router = express.Router();
import { verifyPermission } from '../../middlewares/verifyPermission';
import {
  addConcernsController,
  deleteConcernsController,
  getAllConcernsController,
  getSingleConcernsController,
  updateConcernsController,
} from './concernsController';
import { fileUploader } from '../../utils/fileUploader';
const { upload, uploadAndConvert } = fileUploader('concerns');
const uploader = upload.single('logo');

Router.post(
  '/add',
  verifyPermission('concerns', 'create'),
  uploader,
  uploadAndConvert,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
  },
  addConcernsController,
);
Router.get('/all', getAllConcernsController);
Router.get('/:id', getSingleConcernsController);
Router.patch(
  '/update/:id',
  verifyPermission('concerns', 'update'),
  uploader,
  uploadAndConvert,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
  },
  updateConcernsController,
);
Router.delete(
  '/delete/:id',
  verifyPermission('concerns', 'delete'),
  deleteConcernsController,
);

export const concernsRoute = Router;
