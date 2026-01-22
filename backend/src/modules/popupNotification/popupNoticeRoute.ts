import express, { NextFunction, Request, Response } from 'express';
const Router = express.Router();
import { verifyPermission } from '../../middlewares/verifyPermission';
import {
  addPopupNoticeController,
  deletePopupNoticeController,
  getPopupNoticeController,
  getSinglePopupNoticeController,
  updatePopupNoticeController,
} from './popupNoticeController';
import { fileUploader } from '../../utils/fileUploader';
const { upload, uploadAndConvert } = fileUploader('notice');
const uploader = upload.single('image');

Router.post(
  '/add',
  verifyPermission('notice', 'create'),
  uploader,
  uploadAndConvert,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
  },
  addPopupNoticeController,
);
Router.get('/', getPopupNoticeController);
Router.get('/:id', getSinglePopupNoticeController);
Router.patch(
  '/update/:id',
  verifyPermission('notice', 'update'),
  uploader,
  uploadAndConvert,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
  },
  updatePopupNoticeController,
);
Router.delete(
  '/delete/:id',
  verifyPermission('notice', 'delete'),
  deletePopupNoticeController,
);

export const popupNoticeRoute = Router;
