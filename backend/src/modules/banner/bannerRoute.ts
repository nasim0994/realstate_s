import express, { NextFunction, Request, Response } from 'express';
const Router = express.Router();
import { verifyPermission } from '../../middlewares/verifyPermission';
import {
  addBannerController,
  deleteBannerController,
  getAllBannerController,
  getSingleBannerController,
  updateBannerController,
} from './bannerController';
import { fileUploader } from '../../utils/fileUploader';
const upload = fileUploader('banner').single('image');

Router.post(
  '/add',
  verifyPermission('banner', 'create'),
  upload,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
  },
  addBannerController,
);
Router.get('/all', getAllBannerController);
Router.get('/:id', getSingleBannerController);
Router.patch(
  '/update/:id',
  verifyPermission('banner', 'update'),
  upload,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
  },
  updateBannerController,
);
Router.delete(
  '/delete/:id',
  verifyPermission('banner', 'delete'),
  deleteBannerController,
);

export const bannerRoute = Router;
