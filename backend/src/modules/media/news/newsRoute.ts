import express, { NextFunction, Request, Response } from 'express';
const Router = express.Router();
import { verifyPermission } from '../../../middlewares/verifyPermission';
import {
  addNewsController,
  deleteNewsController,
  getAllNewsController,
  getSingleNewsController,
  updateNewsController,
} from './newsController';
import { fileUploader } from '../../../utils/fileUploader';
const { upload, uploadAndConvert } = fileUploader('news');
const uploader = upload.single('image');

Router.post(
  '/add',
  verifyPermission('news', 'create'),
  uploader,
  uploadAndConvert,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
  },
  addNewsController,
);
Router.get('/all', getAllNewsController);
Router.get('/:id', getSingleNewsController);
Router.patch(
  '/update/:id',
  verifyPermission('news', 'update'),
  uploader,
  uploadAndConvert,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
  },
  updateNewsController,
);
Router.delete(
  '/delete/:id',
  verifyPermission('news', 'delete'),
  deleteNewsController,
);

export const newsRoute = Router;
