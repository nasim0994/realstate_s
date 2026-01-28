import express, { NextFunction, Request, Response } from 'express';
const Router = express.Router();
import { verifyPermission } from '../../middlewares/verifyPermission';
import {
  addConcernProductController,
  deleteConcernProductController,
  getAllConcernProductController,
  getSingleConcernProductController,
  getConcernProductCountController,
  updateConcernProductController,
} from './concernProductController';
import { fileUploader } from '../../utils/fileUploader';

const { upload, uploadAndConvert } = fileUploader('concernProduct');
const uploader = upload.single('image');

Router.post(
  '/add',
  uploader,
  uploadAndConvert,
  verifyPermission('concern-product', 'create'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
  },
  addConcernProductController,
);
Router.get('/all', getAllConcernProductController);
Router.get('/count', getConcernProductCountController);
Router.get('/:id', getSingleConcernProductController);
Router.patch(
  '/update/:id',
  verifyPermission('concern-product', 'update'),
  uploader,
  uploadAndConvert,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
  },
  updateConcernProductController,
);
Router.delete(
  '/delete/:id',
  verifyPermission('concern-product', 'delete'),
  deleteConcernProductController,
);

export const concernProductRoute = Router;
