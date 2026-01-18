import express from 'express';
const Router = express.Router();
import verifyValidate from '../../middlewares/verifyValidate';
import { verifyPermission } from '../../middlewares/verifyPermission';
import { gtmValidation } from './gtmValidation';
import {
  createGtmController,
  getGtmController,
  updateGtmController,
} from './gtmController';

Router.post(
  '/add',
  verifyPermission('gtm', 'create'),
  verifyValidate(gtmValidation),
  createGtmController,
);
Router.get('/', getGtmController);
Router.patch(
  '/update/:id',
  verifyPermission('gtm', 'update'),
  verifyValidate(gtmValidation),
  updateGtmController,
);

export const gtmRoute = Router;
