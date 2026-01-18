import express from 'express';
const Router = express.Router();
import verifyValidate from '../../middlewares/verifyValidate';
import { verifyPermission } from '../../middlewares/verifyPermission';
import {
  contactValidation,
  updateContactValidation,
} from './contactValidation';
import {
  addContactController,
  getContactController,
  updateContactController,
} from './contactController';

Router.post(
  '/add',
  verifyPermission('contact', 'create'),
  verifyValidate(contactValidation),
  addContactController,
);
Router.get('/', getContactController);
Router.patch(
  '/update/:id',
  verifyPermission('contact', 'update'),
  verifyValidate(updateContactValidation),
  updateContactController,
);

export const contactRoute = Router;
