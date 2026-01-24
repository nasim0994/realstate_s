import express, { NextFunction, Request, Response } from 'express';
const Router = express.Router();
import { verifyPermission } from '../../middlewares/verifyPermission';
import {
  addAwardsController,
  deleteAwardsController,
  getAllAwardsController,
  getSingleAwardsController,
  updateAwardsController,
} from './awardsController';
import { fileUploader } from '../../utils/fileUploader';
const { upload, uploadAndConvert } = fileUploader('awards');
const uploader = upload.single('image');

Router.post(
  '/add',
  verifyPermission('awards', 'create'),
  uploader,
  uploadAndConvert,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
  },
  addAwardsController,
);
Router.get('/all', getAllAwardsController);
Router.get('/:id', getSingleAwardsController);
Router.patch(
  '/update/:id',
  verifyPermission('awards', 'update'),
  uploader,
  uploadAndConvert,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
  },
  updateAwardsController,
);
Router.delete(
  '/delete/:id',
  verifyPermission('awards', 'delete'),
  deleteAwardsController,
);

export const awardsRoute = Router;
