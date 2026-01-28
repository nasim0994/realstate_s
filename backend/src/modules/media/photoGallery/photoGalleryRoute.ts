import express, { NextFunction, Request, Response } from 'express';
import {
  createPhotoGalleryController,
  deletePhotoGalleryController,
  getAllPhotoGalleryController,
  getByIdPhotoGalleryController,
  getBySlugPhotoGalleryController,
  updatePhotoGalleryController,
} from './photoGalleryController';
import { verifyPermission } from '../../../middlewares/verifyPermission';
const Router = express.Router();

import { fileUploader } from '../../../utils/fileUploader';
const { upload, uploadAndConvert } = fileUploader('photoGallery');

const uploader = upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'gallery' },
]);

Router.post(
  '/add',
  verifyPermission('photo-gallery', 'create'),
  uploader,
  uploadAndConvert,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
  },
  createPhotoGalleryController,
);
Router.get('/all', getAllPhotoGalleryController);
Router.get('/:id', getByIdPhotoGalleryController);
Router.get('/slug/:slug', getBySlugPhotoGalleryController);
Router.patch(
  '/update/:id',
  verifyPermission('photo-gallery', 'update'),
  uploader,
  uploadAndConvert,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
  },
  updatePhotoGalleryController,
);
Router.delete(
  '/delete/:id',
  verifyPermission('photo-gallery', 'delete'),
  deletePhotoGalleryController,
);

export const photoGalleryRoute = Router;
