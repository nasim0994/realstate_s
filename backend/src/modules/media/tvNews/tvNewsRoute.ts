import express, { NextFunction, Request, Response } from 'express';
const Router = express.Router();
import { verifyPermission } from '../../../middlewares/verifyPermission';
import {
  addTvNewsController,
  deleteTvNewsController,
  getAllTvNewsController,
  getSingleTvNewsController,
  updateTvNewsController,
} from './tvNewsController';
import { fileUploader } from '../../../utils/fileUploader';
const { upload, uploadAndConvert } = fileUploader('tvNews');
const uploader = upload.single('image');

Router.post(
  '/add',
  verifyPermission('tv-news', 'create'),
  uploader,
  uploadAndConvert,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
  },
  addTvNewsController,
);
Router.get('/all', getAllTvNewsController);
Router.get('/:id', getSingleTvNewsController);
Router.patch(
  '/update/:id',
  verifyPermission('tv-news', 'update'),
  uploader,
  uploadAndConvert,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
  },
  updateTvNewsController,
);
Router.delete(
  '/delete/:id',
  verifyPermission('tv-news', 'delete'),
  deleteTvNewsController,
);

export const tvNewsRoute = Router;
