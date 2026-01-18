import express from 'express';
const Router = express.Router();
import {
  createSeoController,
  getSeoController,
  updateSeoController,
} from './seoController';
import { seoValidation, updateSeoValidation } from './seoValidation';
import verifyValidate from '../../middlewares/verifyValidate';
import { verifyPermission } from '../../middlewares/verifyPermission';

Router.post(
  '/add',
  verifyPermission('seo', 'create'),
  verifyValidate(seoValidation),
  createSeoController,
);
Router.get('/', getSeoController);
Router.patch(
  '/update/:id',
  verifyPermission('seo', 'update'),
  verifyValidate(updateSeoValidation),
  updateSeoController,
);

export const seoRoute = Router;
