import express, { NextFunction, Request, Response } from 'express';
import {
  addUserController,
  deleteUserController,
  getAllUserController,
  getSingleUserController,
  getUserCountController,
  updatePasswordController,
  updateProfileController,
  updateUserController,
} from './userController';
import verifyValidate from '../../middlewares/verifyValidate';
import { userValidation } from './userValidation';
import { verifyPermission } from '../../middlewares/verifyPermission';
import { fileUploader } from '../../utils/fileUploader';
const Router = express.Router();

const { upload, uploadAndConvert } = fileUploader('user');
const uploader = upload.single('image');

Router.post(
  '/add',
  verifyPermission('user', 'create'),
  verifyValidate(userValidation),
  addUserController,
);
Router.get('/all', verifyPermission('user', 'read'), getAllUserController);
Router.get('/count', getUserCountController);
Router.get('/:id', getSingleUserController);
Router.put(
  '/update/:id',
  verifyPermission('user', 'update'),
  updateUserController,
);
Router.put(
  '/update/profile/:id',
  uploader,
  uploadAndConvert,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = req.body.data && JSON.parse(req.body.data);
    next();
  },
  updateProfileController,
);
Router.put('/update/password/:id', updatePasswordController);
Router.delete(
  '/delete/:id',
  verifyPermission('user', 'delete'),
  deleteUserController,
);

export const userRoute = Router;
