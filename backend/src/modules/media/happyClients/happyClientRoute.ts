import express, { NextFunction, Request, Response } from 'express';
const Router = express.Router();
import { verifyPermission } from '../../../middlewares/verifyPermission';
import {
  addHappyClientController,
  deleteHappyClientController,
  getAllHappyClientController,
  getSingleHappyClientController,
  updateHappyClientController,
} from './happyClientController';
import { fileUploader } from '../../../utils/fileUploader';
const { upload, uploadAndConvert } = fileUploader('happyClient');
const uploader = upload.single('image');

Router.post(
  '/add',
  verifyPermission('happy-client', 'create'),
  uploader,
  uploadAndConvert,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
  },
  addHappyClientController,
);
Router.get('/all', getAllHappyClientController);
Router.get('/:id', getSingleHappyClientController);
Router.patch(
  '/update/:id',
  verifyPermission('happy-client', 'update'),
  uploader,
  uploadAndConvert,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
  },
  updateHappyClientController,
);
Router.delete(
  '/delete/:id',
  verifyPermission('happy-client', 'delete'),
  deleteHappyClientController,
);

export const happyClientRoute = Router;
