import express, { NextFunction, Request, Response } from 'express';
const Router = express.Router();
import { verifyPermission } from '../../middlewares/verifyPermission';
import {
  addGeneralSettingController,
  deleteGeneralSettingController,
  getGeneralSettingController,
  getSingleGeneralSettingController,
  updateGeneralSettingController,
} from './generalSettingController';
import { fileUploader } from '../../utils/fileUploader';
const upload = fileUploader('generalSetting').fields([
  { name: 'logo', maxCount: 1 },
  { name: 'favicon', maxCount: 1 },
  { name: 'footerImage', maxCount: 1 },
]);

Router.post(
  '/add',
  verifyPermission('general-setting', 'create'),
  upload,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
  },
  addGeneralSettingController,
);
Router.get('/all', getGeneralSettingController);
Router.get('/:id', getSingleGeneralSettingController);
Router.patch(
  '/update/:id',
  verifyPermission('general-setting', 'update'),
  upload,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
  },
  updateGeneralSettingController,
);
Router.delete(
  '/delete/:id',
  verifyPermission('general-setting', 'delete'),
  deleteGeneralSettingController,
);

export const generalSettingRoute = Router;
