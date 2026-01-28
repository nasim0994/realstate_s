import express, { NextFunction, Request, Response } from 'express';
const Router = express.Router();
import { verifyPermission } from '../../../middlewares/verifyPermission';
import {
  addPressReleaseController,
  deletePressReleaseController,
  getAllPressReleaseController,
  getSinglePressReleaseController,
  updatePressReleaseController,
} from './pressReleaseController';
import { fileUploader } from '../../../utils/fileUploader';
const { upload, uploadAndConvert } = fileUploader('pressRelease');
const uploader = upload.single('image');

Router.post(
  '/add',
  verifyPermission('press-release', 'create'),
  uploader,
  uploadAndConvert,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
  },
  addPressReleaseController,
);
Router.get('/all', getAllPressReleaseController);
Router.get('/:id', getSinglePressReleaseController);
Router.patch(
  '/update/:id',
  verifyPermission('press-release', 'update'),
  uploader,
  uploadAndConvert,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
  },
  updatePressReleaseController,
);
Router.delete(
  '/delete/:id',
  verifyPermission('press-release', 'delete'),
  deletePressReleaseController,
);

export const pressReleaseRoute = Router;
