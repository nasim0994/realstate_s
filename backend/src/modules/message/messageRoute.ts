import express from 'express';
const Router = express.Router();
import verifyValidate from '../../middlewares/verifyValidate';
import { verifyPermission } from '../../middlewares/verifyPermission';
import {
  addMessageController,
  deleteMessageController,
  getAllMessageController,
  getSingleMessageController,
  updateMessageController,
} from './messageController';
import {
  messageValidation,
  updateMessageValidation,
} from './messageValidation';

Router.post('/add', verifyValidate(messageValidation), addMessageController);
Router.get(
  '/all',
  verifyPermission('messages', 'read'),
  getAllMessageController,
);
Router.get(
  '/:id',
  verifyPermission('messages', 'read'),
  getSingleMessageController,
);
Router.patch(
  '/update/:id',
  verifyPermission('messages', 'update'),
  verifyValidate(updateMessageValidation),
  updateMessageController,
);
Router.delete(
  '/delete/:id',
  verifyPermission('messages', 'delete'),
  deleteMessageController,
);

export const MessagesRoute = Router;
