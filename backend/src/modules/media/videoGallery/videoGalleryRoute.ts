import express, { NextFunction, Request, Response } from 'express';
const Router = express.Router();
import { verifyPermission } from '../../../middlewares/verifyPermission';
import {
  addVideoGalleryController,
  deleteVideoGalleryController,
  getAllVideoGalleryController,
  getSingleVideoGalleryController,
  updateVideoGalleryController,
} from './videoGalleryController';
import { fileUploader } from '../../../utils/fileUploader';
const { upload, uploadAndConvert } = fileUploader('videoGallery');
const uploader = upload.single('image');

Router.post(
  '/add',
  verifyPermission('video-gallery', 'create'),
  uploader,
  uploadAndConvert,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
  },
  addVideoGalleryController,
);
Router.get('/all', getAllVideoGalleryController);
Router.get('/:id', getSingleVideoGalleryController);
Router.patch(
  '/update/:id',
  verifyPermission('video-gallery', 'update'),
  uploader,
  uploadAndConvert,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
  },
  updateVideoGalleryController,
);
Router.delete(
  '/delete/:id',
  verifyPermission('video-gallery', 'delete'),
  deleteVideoGalleryController,
);

export const videoGalleryRoute = Router;
