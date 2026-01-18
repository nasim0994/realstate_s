import express from 'express';
const Router = express.Router();
import verifyValidate from '../../middlewares/verifyValidate';
import { verifyPermission } from '../../middlewares/verifyPermission';
import {
  addPageController,
  deletePageController,
  getAllPageController,
  getSinglePageController,
  updatePageController,
} from './pageController';
import { pageValidation, updatePageValidation } from './pageValidation';

Router.post(
  '/add',
  verifyPermission('pages', 'create'),
  verifyValidate(pageValidation),
  addPageController,
);
Router.get('/all', getAllPageController);
Router.get('/:id', getSinglePageController);
Router.patch(
  '/update/:id',
  verifyPermission('pages', 'update'),
  verifyValidate(updatePageValidation),
  updatePageController,
);
Router.delete(
  '/delete/:id',
  verifyPermission('pages', 'delete'),
  deletePageController,
);

export const pagesRoute = Router;
