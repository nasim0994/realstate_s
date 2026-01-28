import express, { NextFunction, Request, Response } from 'express';
const Router = express.Router();
import { verifyPermission } from '../../../middlewares/verifyPermission';
import {
  addChairmanQuoteController,
  deleteChairmanQuoteController,
  getAllChairmanQuoteController,
  getSingleChairmanQuoteController,
  updateChairmanQuoteController,
} from './chairmanQuoteController';
import { fileUploader } from '../../../utils/fileUploader';
const { upload, uploadAndConvert } = fileUploader('chairmanQuote');
const uploader = upload.single('image');

Router.post(
  '/add',
  verifyPermission('chairman-quote', 'create'),
  uploader,
  uploadAndConvert,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
  },
  addChairmanQuoteController,
);
Router.get('/all', getAllChairmanQuoteController);
Router.get('/:id', getSingleChairmanQuoteController);
Router.patch(
  '/update/:id',
  verifyPermission('chairman-quote', 'update'),
  uploader,
  uploadAndConvert,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
  },
  updateChairmanQuoteController,
);
Router.delete(
  '/delete/:id',
  verifyPermission('chairman-quote', 'delete'),
  deleteChairmanQuoteController,
);

export const chairmanQuoteRoute = Router;
