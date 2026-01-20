import express from 'express';
const Router = express.Router();
import verifyValidate from '../../middlewares/verifyValidate';
import { verifyPermission } from '../../middlewares/verifyPermission';
import {
  addMessageController,
  deleteMessageController,
  getAllMessageController,
  getMessageCountsController,
  getSingleMessageController,
  markMessageAsReadController,
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
Router.get('/counts', getMessageCountsController);
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
Router.patch('/mark-as-read/:id', markMessageAsReadController);
Router.delete(
  '/delete/:id',
  verifyPermission('messages', 'delete'),
  deleteMessageController,
);

export const messagesRoute = Router;
