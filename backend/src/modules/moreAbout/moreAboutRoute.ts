import express, { NextFunction, Request, Response } from 'express';
const Router = express.Router();
import { verifyPermission } from '../../middlewares/verifyPermission';
import {
  addMoreAboutController,
  deleteMoreAboutController,
  getAllMoreAboutController,
  getSingleMoreAboutController,
  updateMoreAboutController,
} from './moreAboutController';
import { fileUploader } from '../../utils/fileUploader';

const upload = fileUploader('moreAbout').single('icon');

Router.post(
  '/add',
  verifyPermission('more-about', 'create'),
  upload,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
  },
  addMoreAboutController,
);
Router.get('/all', getAllMoreAboutController);
Router.get('/:id', getSingleMoreAboutController);
Router.patch(
  '/update/:id',
  verifyPermission('more-about', 'update'),
  upload,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
  },
  updateMoreAboutController,
);
Router.delete(
  '/delete/:id',
  verifyPermission('more-about', 'delete'),
  deleteMoreAboutController,
);

export const moreAboutRoute = Router;
